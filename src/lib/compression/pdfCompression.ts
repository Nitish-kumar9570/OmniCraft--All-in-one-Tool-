/**
 * OmniCraft PDF Compression Engine
 *
 * Implements real PDF optimization:
 * - Analyzes PDF object hierarchy and embedded assets
 * - Inspects and selectively optimizes embedded images:
 *   - Evaluates dimensions, format, color space, stream length
 *   - Downsamples oversized images while preserving aspect ratio
 *   - Recompresses JPEG image streams at calibrated quality levels
 *   - Recompresses oversized uncompressed Flate image streams to JPEG
 * - Preserves vector graphics, text sharp streams, and page structure
 * - Strips unneeded metadata streams (XMP Metadata, PieceInfo)
 * - Uses PDF object stream compression for compact cross-references
 * - Verifies readability and page integrity post-compression
 * - Core Rule: NEVER return a candidate larger than the original file
 */

import {
  PDFDocument,
  PDFName,
  PDFNumber,
  PDFRawStream,
  decodePDFRawStream,
} from "pdf-lib";

export type PdfCompressionLevel = "low" | "balanced" | "high";

export interface PdfCompressionOptions {
  level?: PdfCompressionLevel;
  onProgress?: (stage: string, percent?: number) => void;
}

export interface PdfCompressionResult {
  file: File | Blob;
  outputBlob: Blob;
  outputUrl: string;
  compressed: boolean;
  originalSize: number;
  outputSize: number;
  savedBytes: number;
  reductionPercent: number;
  status: "compressed" | "already_optimized" | "not_beneficial";
  message: string;
  pageCount: number;
  imagesFound: number;
  imagesOptimized: number;
}

interface LevelConfig {
  maxDimension: number;
  jpegQuality: number;
  minStreamSizeToOptimize: number;
}

const LEVEL_CONFIGS: Record<PdfCompressionLevel, LevelConfig> = {
  low: {
    maxDimension: 2048,
    jpegQuality: 0.82,
    minStreamSizeToOptimize: 25 * 1024, // 25 KB
  },
  balanced: {
    maxDimension: 1600,
    jpegQuality: 0.72,
    minStreamSizeToOptimize: 15 * 1024, // 15 KB
  },
  high: {
    maxDimension: 1200,
    jpegQuality: 0.58,
    minStreamSizeToOptimize: 8 * 1024, // 8 KB
  },
};

/**
 * Helper to downscale and re-encode an image element on canvas.
 */
async function compressImageElement(
  imgSource: HTMLImageElement | ImageBitmap | HTMLCanvasElement,
  sourceWidth: number,
  sourceHeight: number,
  maxDimension: number,
  quality: number
): Promise<{ bytes: Uint8Array; width: number; height: number } | null> {
  try {
    if (typeof window === "undefined" || !document) return null;

    let targetWidth = sourceWidth;
    let targetHeight = sourceHeight;
    const currentMax = Math.max(sourceWidth, sourceHeight);

    // Downsample only when dimensions exceed max allowed. Never upscale.
    if (currentMax > maxDimension) {
      const scale = maxDimension / currentMax;
      targetWidth = Math.max(1, Math.round(sourceWidth * scale));
      targetHeight = Math.max(1, Math.round(sourceHeight * scale));
    }

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(imgSource, 0, 0, targetWidth, targetHeight);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), "image/jpeg", quality);
    });

    if (!blob) return null;

    const buffer = await blob.arrayBuffer();
    return {
      bytes: new Uint8Array(buffer),
      width: targetWidth,
      height: targetHeight,
    };
  } catch (err) {
    return null;
  }
}

/**
 * Optimize an individual image XObject stream in the PDF context.
 */
async function optimizePdfImageStream(
  stream: PDFRawStream,
  config: LevelConfig
): Promise<boolean> {
  try {
    const filter = stream.dict.get(PDFName.of("Filter"))?.toString();
    const widthObj = stream.dict.get(PDFName.of("Width"));
    const heightObj = stream.dict.get(PDFName.of("Height"));

    const width =
      widthObj instanceof PDFNumber
        ? widthObj.asNumber()
        : typeof (widthObj as any)?.value === "number"
        ? (widthObj as any).value
        : parseInt(widthObj?.toString() || "0", 10);

    const height =
      heightObj instanceof PDFNumber
        ? heightObj.asNumber()
        : typeof (heightObj as any)?.value === "number"
        ? (heightObj as any).value
        : parseInt(heightObj?.toString() || "0", 10);

    if (!width || !height || width <= 0 || height <= 0) {
      return false;
    }

    // Skip tiny icons, stamps, or barcodes that would not benefit
    if (stream.contents.length < config.minStreamSizeToOptimize) {
      return false;
    }

    // Case 1: DCTDecode (Standard JPEG)
    if (filter === "/DCTDecode") {
      const blob = new Blob([stream.contents as any], { type: "image/jpeg" });
      let imgBitmap: ImageBitmap | HTMLImageElement | null = null;

      try {
        if (typeof createImageBitmap === "function") {
          imgBitmap = await createImageBitmap(blob);
        }
      } catch {
        // Fallback to Image element
      }

      if (!imgBitmap) {
        imgBitmap = await new Promise<HTMLImageElement | null>((resolve) => {
          const img = new Image();
          const url = URL.createObjectURL(blob);
          img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve(null);
          };
          img.src = url;
        });
      }

      if (!imgBitmap) return false;

      const sourceW = (imgBitmap as ImageBitmap).width || (imgBitmap as HTMLImageElement).naturalWidth || width;
      const sourceH = (imgBitmap as ImageBitmap).height || (imgBitmap as HTMLImageElement).naturalHeight || height;

      const result = await compressImageElement(
        imgBitmap,
        sourceW,
        sourceH,
        config.maxDimension,
        config.jpegQuality
      );

      if ("close" in imgBitmap && typeof imgBitmap.close === "function") {
        imgBitmap.close();
      }

      // CRITICAL: Only replace if recompressed bytes are strictly smaller
      if (result && result.bytes.length < stream.contents.length) {
        (stream as any).contents = result.bytes;
        stream.dict.set(PDFName.of("Length"), PDFNumber.of(result.bytes.length));
        stream.dict.set(PDFName.of("Width"), PDFNumber.of(result.width));
        stream.dict.set(PDFName.of("Height"), PDFNumber.of(result.height));
        stream.dict.set(PDFName.of("ColorSpace"), PDFName.of("DeviceRGB"));
        stream.dict.delete(PDFName.of("DecodeParms"));
        return true;
      }

      return false;
    }

    // Case 2: FlateDecode (Deflated raw pixel samples without mask)
    const hasSMask = stream.dict.has(PDFName.of("SMask"));
    if (filter === "/FlateDecode" && !hasSMask && typeof window !== "undefined") {
      try {
        const decoded = decodePDFRawStream(stream).decode();
        const colorSpace = stream.dict.get(PDFName.of("ColorSpace"))?.toString();
        const bitsPerComponent =
          (stream.dict.get(PDFName.of("BitsPerComponent")) as any)?.asNumber?.() ?? 8;

        if (bitsPerComponent === 8) {
          const isRGB = colorSpace === "/DeviceRGB" || (!colorSpace && decoded.length === width * height * 3);
          const isGray = colorSpace === "/DeviceGray" || decoded.length === width * height;

          if ((isRGB && decoded.length === width * height * 3) || (isGray && decoded.length === width * height)) {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");

            if (ctx) {
              const imgData = ctx.createImageData(width, height);
              const dst = imgData.data;

              if (isRGB) {
                let s = 0;
                let d = 0;
                for (let i = 0; i < width * height; i++) {
                  dst[d] = decoded[s];
                  dst[d + 1] = decoded[s + 1];
                  dst[d + 2] = decoded[s + 2];
                  dst[d + 3] = 255;
                  s += 3;
                  d += 4;
                }
              } else {
                let s = 0;
                let d = 0;
                for (let i = 0; i < width * height; i++) {
                  const g = decoded[s++];
                  dst[d] = g;
                  dst[d + 1] = g;
                  dst[d + 2] = g;
                  dst[d + 3] = 255;
                  d += 4;
                }
              }

              ctx.putImageData(imgData, 0, 0);

              // Downscale and compress to JPEG
              const result = await compressImageElement(
                canvas,
                width,
                height,
                config.maxDimension,
                config.jpegQuality
              );

              // If JPEG is smaller than the original flate stream:
              if (result && result.bytes.length < stream.contents.length) {
                (stream as any).contents = result.bytes;
                stream.dict.set(PDFName.of("Filter"), PDFName.of("DCTDecode"));
                stream.dict.set(PDFName.of("ColorSpace"), PDFName.of("DeviceRGB"));
                stream.dict.set(PDFName.of("BitsPerComponent"), PDFNumber.of(8));
                stream.dict.set(PDFName.of("Width"), PDFNumber.of(result.width));
                stream.dict.set(PDFName.of("Height"), PDFNumber.of(result.height));
                stream.dict.set(PDFName.of("Length"), PDFNumber.of(result.bytes.length));
                stream.dict.delete(PDFName.of("DecodeParms"));
                return true;
              }
            }
          }
        }
      } catch {
        // Leave stream intact on any decode issue
      }
    }

    return false;
  } catch (err) {
    // If anything fails during single image optimization, keep original stream
    return false;
  }
}

/**
 * Main PDF Compressor Function
 */
export async function compressPdfFile(
  file: File | Blob,
  options: PdfCompressionOptions = {}
): Promise<PdfCompressionResult> {
  const originalSize = file.size;
  const originalBlob = file;
  const originalUrl = URL.createObjectURL(file);
  const level = options.level || "balanced";
  const config = LEVEL_CONFIGS[level];
  const onProgress = options.onProgress;

  try {
    onProgress?.("Analyzing PDF structure and assets...", 10);
    const buffer = await file.arrayBuffer();

    let pdfDoc: PDFDocument;
    try {
      pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
    } catch (err) {
      return {
        file,
        outputBlob: originalBlob,
        outputUrl: originalUrl,
        compressed: false,
        originalSize,
        outputSize: originalSize,
        savedBytes: 0,
        reductionPercent: 0,
        status: "not_beneficial",
        message: "Unable to parse this PDF file. Protected or invalid structure.",
        pageCount: 0,
        imagesFound: 0,
        imagesOptimized: 0,
      };
    }

    const originalPageCount = pdfDoc.getPageCount();

    // 1. Collect all image XObject streams
    onProgress?.("Cataloging embedded images...", 25);
    const imageStreams: PDFRawStream[] = [];

    for (const [, obj] of pdfDoc.context.enumerateIndirectObjects()) {
      if (obj instanceof PDFRawStream) {
        const subtype = obj.dict.get(PDFName.of("Subtype"));
        if (subtype?.toString() === "/Image") {
          imageStreams.push(obj);
        }
      }
    }

    const imagesFound = imageStreams.length;
    let imagesOptimized = 0;

    // 2. Progressively optimize images if present
    if (imagesFound > 0) {
      for (let i = 0; i < imagesFound; i++) {
        const pct = 30 + Math.round(((i + 1) / imagesFound) * 45);
        onProgress?.(
          `Optimizing embedded image ${i + 1} of ${imagesFound}...`,
          pct
        );

        // Yield execution to browser main thread so UI stays fluid
        await new Promise((resolve) => setTimeout(resolve, 8));

        const stream = imageStreams[i];
        const didOptimize = await optimizePdfImageStream(stream, config);
        if (didOptimize) {
          imagesOptimized++;
        }
      }
    }

    // 3. Clean unneeded metadata and redundant structures
    onProgress?.("Optimizing PDF document streams & metadata...", 80);
    try {
      pdfDoc.setTitle("");
      pdfDoc.setAuthor("");
      pdfDoc.setSubject("");
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer("OmniCraft Engine");
      pdfDoc.setCreator("OmniCraft Engine");

      // Strip unneeded XML metadata streams and application piece info
      pdfDoc.catalog.delete(PDFName.of("Metadata"));
      pdfDoc.catalog.delete(PDFName.of("PieceInfo"));
    } catch {
      // Ignore metadata stripping errors
    }

    // 4. Save with cross-reference object stream compression
    onProgress?.("Rebuilding and compressing streams...", 88);
    const compressedBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });

    const compressedSize = compressedBytes.length;

    // 5. Verification step: Ensure output is valid and can be loaded
    onProgress?.("Verifying PDF integrity...", 95);
    try {
      const verifiedDoc = await PDFDocument.load(compressedBytes, {
        ignoreEncryption: true,
      });
      if (verifiedDoc.getPageCount() !== originalPageCount) {
        throw new Error("Page count mismatch");
      }
    } catch (err) {
      console.warn("Verification failed for compressed PDF, retaining original:", err);
      return {
        file,
        outputBlob: originalBlob,
        outputUrl: originalUrl,
        compressed: false,
        originalSize,
        outputSize: originalSize,
        savedBytes: 0,
        reductionPercent: 0,
        status: "not_beneficial",
        message: "Compression could not safely reduce this file.",
        pageCount: originalPageCount,
        imagesFound,
        imagesOptimized: 0,
      };
    }

    // 6. CORE RULE: If output is >= original size, DO NOT RETURN LARGER FILE!
    if (compressedSize >= originalSize) {
      onProgress?.("Complete", 100);
      return {
        file,
        outputBlob: originalBlob,
        outputUrl: originalUrl,
        compressed: false,
        originalSize,
        outputSize: originalSize,
        savedBytes: 0,
        reductionPercent: 0,
        status: "already_optimized",
        message:
          imagesOptimized > 0
            ? "PDF is already well optimized — further compression would increase file size."
            : "PDF is already optimized — no smaller version was produced without reducing quality.",
        pageCount: originalPageCount,
        imagesFound,
        imagesOptimized: 0,
      };
    }

    // Success: compressed output is strictly smaller
    const savedBytes = originalSize - compressedSize;
    const reductionPercent = Math.max(
      0,
      Math.round((savedBytes / originalSize) * 100)
    );
    const compressedBlob = new Blob([compressedBytes as any], {
      type: "application/pdf",
    });
    const compressedUrl = URL.createObjectURL(compressedBlob);

    onProgress?.("Complete", 100);

    return {
      file,
      outputBlob: compressedBlob,
      outputUrl: compressedUrl,
      compressed: true,
      originalSize,
      outputSize: compressedSize,
      savedBytes,
      reductionPercent,
      status: "compressed",
      message: `PDF reduced by ${reductionPercent}% (${formatBytes(savedBytes)} saved)`,
      pageCount: originalPageCount,
      imagesFound,
      imagesOptimized,
    };
  } catch (err: any) {
    console.error("PDF compression error:", err);
    return {
      file,
      outputBlob: originalBlob,
      outputUrl: originalUrl,
      compressed: false,
      originalSize,
      outputSize: originalSize,
      savedBytes: 0,
      reductionPercent: 0,
      status: "not_beneficial",
      message: "Compression could not improve this file.",
      pageCount: 0,
      imagesFound: 0,
      imagesOptimized: 0,
    };
  }
}

function formatBytes(bytes: number): string {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

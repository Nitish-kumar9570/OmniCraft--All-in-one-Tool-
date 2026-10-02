/**
 * OmniCraft Image Compression Engine
 *
 * Implements real adaptive image compression:
 * - Intelligent format detection (JPEG, PNG, WebP, AVIF)
 * - Transparency preservation for PNG / WebP
 * - Adaptive quality stepping (80 -> 75 -> 70 -> 65 -> 60)
 * - Dimension downscaling with aspect ratio preservation (never upscales)
 * - Small file protection (avoids bloating already-optimized small files)
 * - Multi-candidate evaluation (picks smallest valid candidate < originalSize)
 * - Integrity verification (ensures output can be opened/read)
 * - Core Rule: NEVER return output larger than original file.
 */

export type ImageCompressionMode = "fast" | "balanced" | "maximum" | "custom";

export type ImageDimensionPreset = "original" | "large" | "medium" | "small" | "custom";

export interface ImageCompressionOptions {
  mode?: ImageCompressionMode;
  quality?: number; // 1 - 100 (used in custom or as baseline)
  dimensionPreset?: ImageDimensionPreset;
  customScalePercent?: number; // 10 - 100%
  customMaxWidth?: number;
  customMaxHeight?: number;
  stripMetadata?: boolean;
  outputFormat?: "auto" | "jpeg" | "png" | "webp" | "avif";
  allowFormatConversion?: boolean;
}

export interface ImageCompressionResult {
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
  originalWidth: number;
  originalHeight: number;
  outputWidth: number;
  outputHeight: number;
  format: string;
}

/**
 * Detect image mime type from file, extension, or fallback.
 */
export function detectImageFormat(file: File | Blob, filename?: string): string {
  if (file.type && file.type.startsWith("image/")) {
    return file.type.toLowerCase();
  }
  const name = filename || (file instanceof File ? file.name : "");
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "avif":
      return "image/avif";
    case "gif":
      return "image/gif";
    default:
      return "image/jpeg";
  }
}

/**
 * Check whether a canvas has transparent pixels.
 */
function checkTransparency(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): boolean {
  try {
    // Sample pixels across image to keep performance fast
    const sampleStep = Math.max(1, Math.floor(Math.sqrt((width * height) / 8000)));
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let y = 0; y < height; y += sampleStep) {
      for (let x = 0; x < width; x += sampleStep) {
        const alpha = data[(y * width + x) * 4 + 3];
        if (alpha < 250) {
          return true;
        }
      }
    }
  } catch {
    // In case of security or read failure, assume safe
  }
  return false;
}

/**
 * Calculate downscaled dimensions according to preset or custom scale.
 * NEVER UPSCALE! Width and height will never exceed original.
 */
export function calculateTargetDimensions(
  origWidth: number,
  origHeight: number,
  preset: ImageDimensionPreset = "original",
  customScalePercent = 100,
  customMaxWidth?: number,
  customMaxHeight?: number
): { width: number; height: number } {
  if (origWidth <= 0 || origHeight <= 0) {
    return { width: origWidth, height: origHeight };
  }

  let maxDim: number | null = null;

  switch (preset) {
    case "small":
      maxDim = 800;
      break;
    case "medium":
      maxDim = 1200;
      break;
    case "large":
      maxDim = 1920;
      break;
    case "custom": {
      if (customMaxWidth || customMaxHeight) {
        let targetW = customMaxWidth ? Math.min(customMaxWidth, origWidth) : origWidth;
        let targetH = customMaxHeight ? Math.min(customMaxHeight, origHeight) : origHeight;
        const scale = Math.min(targetW / origWidth, targetH / origHeight);
        return {
          width: Math.max(1, Math.round(origWidth * scale)),
          height: Math.max(1, Math.round(origHeight * scale)),
        };
      }
      if (customScalePercent < 100 && customScalePercent > 0) {
        const scale = customScalePercent / 100;
        return {
          width: Math.max(1, Math.round(origWidth * scale)),
          height: Math.max(1, Math.round(origHeight * scale)),
        };
      }
      return { width: origWidth, height: origHeight };
    }
    case "original":
    default:
      return { width: origWidth, height: origHeight };
  }

  if (maxDim !== null) {
    const currentMax = Math.max(origWidth, origHeight);
    if (currentMax > maxDim) {
      const scale = maxDim / currentMax;
      return {
        width: Math.max(1, Math.round(origWidth * scale)),
        height: Math.max(1, Math.round(origHeight * scale)),
      };
    }
  }

  // Never upscale
  return { width: origWidth, height: origHeight };
}

/**
 * Verify that a generated image blob can be decoded and loaded.
 */
export async function verifyImageBlob(blob: Blob): Promise<boolean> {
  if (blob.size <= 0) return false;
  if (typeof window === "undefined") return true;

  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img.naturalWidth > 0 && img.naturalHeight > 0);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(false);
    };
    img.src = url;
  });
}

/**
 * Check if browser supports encoding to a specific mime type via canvas.
 */
function isMimeTypeSupported(canvas: HTMLCanvasElement, mimeType: string): boolean {
  try {
    const dataUrl = canvas.toDataURL(mimeType);
    return dataUrl.startsWith(`data:${mimeType}`);
  } catch {
    return false;
  }
}

/**
 * Canvas to Blob helper promise.
 */
function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality?: number
): Promise<Blob | null> {
  return new Promise((resolve) => {
    try {
      canvas.toBlob(
        (blob) => resolve(blob),
        mimeType,
        quality !== undefined ? quality : undefined
      );
    } catch {
      resolve(null);
    }
  });
}

/**
 * Core image compression function.
 */
export async function compressImageFile(
  file: File | Blob,
  options: ImageCompressionOptions = {}
): Promise<ImageCompressionResult> {
  const originalSize = file.size;
  const originalUrl = URL.createObjectURL(file);
  const detectedMime = detectImageFormat(file);

  const mode = options.mode || "balanced";
  const dimensionPreset = options.dimensionPreset || "original";
  const customScalePercent = options.customScalePercent ?? 100;
  const customMaxWidth = options.customMaxWidth;
  const customMaxHeight = options.customMaxHeight;
  const allowFormatConversion = options.allowFormatConversion ?? (mode === "balanced" || mode === "maximum");

  // Load image element to inspect dimensions and draw
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("Failed to load source image for compression"));
    el.src = originalUrl;
  });

  const origWidth = img.naturalWidth;
  const origHeight = img.naturalHeight;

  // Calculate target dimensions
  let { width: targetWidth, height: targetHeight } = calculateTargetDimensions(
    origWidth,
    origHeight,
    dimensionPreset,
    customScalePercent,
    customMaxWidth,
    customMaxHeight
  );

  // Auto-downscale very large images in maximum compression mode if not explicitly set
  if (mode === "maximum" && dimensionPreset === "original") {
    const maxDimension = Math.max(origWidth, origHeight);
    if (maxDimension > 2560) {
      const scale = 2560 / maxDimension;
      targetWidth = Math.round(origWidth * scale);
      targetHeight = Math.round(origHeight * scale);
    }
  }

  // Draw image on canvas
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    URL.revokeObjectURL(originalUrl);
    return {
      file,
      outputBlob: file,
      outputUrl: URL.createObjectURL(file),
      compressed: false,
      originalSize,
      outputSize: originalSize,
      savedBytes: 0,
      reductionPercent: 0,
      status: "not_beneficial",
      message: "Canvas context not supported.",
      originalWidth: origWidth,
      originalHeight: origHeight,
      outputWidth: origWidth,
      outputHeight: origHeight,
      format: detectedMime.replace("image/", ""),
    };
  }

  // High quality smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  // Detect transparency
  const hasAlpha = checkTransparency(ctx, targetWidth, targetHeight);

  // Determine candidate formats
  let formatsToTest: string[] = [];

  if (options.outputFormat && options.outputFormat !== "auto") {
    formatsToTest = [`image/${options.outputFormat}`];
    // Safety: If user picked JPEG but image has transparency, do not produce black background unless forced
    if (options.outputFormat === "jpeg" && hasAlpha) {
      formatsToTest = ["image/webp", "image/png"];
    }
  } else {
    // Intelligent format selection
    if (detectedMime === "image/png") {
      if (hasAlpha) {
        // Keep transparency: test WebP candidate and PNG
        formatsToTest = ["image/webp", "image/png"];
      } else {
        // Simple or opaque PNG: test JPEG, WebP, PNG
        formatsToTest = allowFormatConversion
          ? ["image/webp", "image/jpeg", "image/png"]
          : ["image/png", "image/webp"];
      }
    } else if (detectedMime === "image/jpeg") {
      formatsToTest = allowFormatConversion
        ? ["image/jpeg", "image/webp"]
        : ["image/jpeg"];
    } else if (detectedMime === "image/webp") {
      formatsToTest = ["image/webp"];
    } else {
      formatsToTest = [detectedMime, "image/webp"];
    }
  }

  // Determine quality levels to evaluate adaptively
  let initialQuality = 80;
  let minQuality = 60;

  if (mode === "fast") {
    initialQuality = 85;
    minQuality = 75;
  } else if (mode === "balanced") {
    initialQuality = 80;
    minQuality = 60;
  } else if (mode === "maximum") {
    initialQuality = 70;
    minQuality = 45;
  } else if (mode === "custom") {
    const q = options.quality ?? 75;
    initialQuality = q;
    minQuality = Math.max(20, q - 15);
  }

  // Small file detection (<= 150 KB)
  const isSmallFile = originalSize <= 150 * 1024;
  if (isSmallFile && mode !== "maximum") {
    // For small files, start gently to avoid bloating
    initialQuality = Math.min(initialQuality, 75);
  }

  interface CandidateResult {
    blob: Blob;
    mime: string;
    quality: number;
    size: number;
  }

  const validCandidates: CandidateResult[] = [];

  for (const mime of formatsToTest) {
    if (!isMimeTypeSupported(canvas, mime)) continue;

    const isLossy = mime === "image/jpeg" || mime === "image/webp" || mime === "image/avif";

    if (!isLossy) {
      // Lossless (e.g. PNG)
      const blob = await canvasToBlob(canvas, mime);
      if (blob && blob.size < originalSize) {
        const isValid = await verifyImageBlob(blob);
        if (isValid) {
          validCandidates.push({ blob, mime, quality: 100, size: blob.size });
        }
      }
      continue;
    }

    // Adaptive quality search for lossy formats:
    // 80 -> 75 -> 70 -> 65 -> 60
    let currentQ = initialQuality;
    let prevSize: number | null = null;

    while (currentQ >= minQuality) {
      const qFactor = currentQ / 100;
      const blob = await canvasToBlob(canvas, mime, qFactor);

      if (blob) {
        const currentSize = blob.size;

        // If candidate is smaller than original
        if (currentSize < originalSize) {
          const isValid = await verifyImageBlob(blob);
          if (isValid) {
            validCandidates.push({
              blob,
              mime,
              quality: currentQ,
              size: currentSize,
            });

            // Stop criteria:
            // 1. In FAST mode, one smaller candidate is enough
            // 2. In BALANCED mode, if size is at least 15-20% reduced or further drop yields < 2KB / < 3% benefit, stop
            if (mode === "fast") break;

            if (prevSize !== null) {
              const incrementalSaving = prevSize - currentSize;
              const incrementalPercent = (incrementalSaving / prevSize) * 100;
              if (incrementalPercent < 2.5) {
                // Diminishing returns: stop reducing quality
                break;
              }
            }

            // If already reduced by >= 35% in balanced mode, stop
            const totalReduction = ((originalSize - currentSize) / originalSize) * 100;
            if (mode === "balanced" && totalReduction >= 35) {
              break;
            }

            prevSize = currentSize;
          }
        }
      }

      // Step down quality
      currentQ -= 5;
    }
  }

  // CORE RULE: Select best candidate ONLY if smaller than original
  // Filter candidates where size < originalSize
  const beneficialCandidates = validCandidates.filter((c) => c.size < originalSize);

  if (beneficialCandidates.length > 0) {
    // Sort by smallest file size
    beneficialCandidates.sort((a, b) => a.size - b.size);
    const best = beneficialCandidates[0];

    const savedBytes = originalSize - best.size;
    const reductionPercent = Math.max(0, Math.round((savedBytes / originalSize) * 100));
    const outputUrl = URL.createObjectURL(best.blob);

    return {
      file,
      outputBlob: best.blob,
      outputUrl,
      compressed: true,
      originalSize,
      outputSize: best.size,
      savedBytes,
      reductionPercent,
      status: "compressed",
      message: `Reduced by ${reductionPercent}% (${formatOutputFormat(best.mime)})`,
      originalWidth: origWidth,
      originalHeight: origHeight,
      outputWidth: targetWidth,
      outputHeight: targetHeight,
      format: best.mime.replace("image/", ""),
    };
  }

  // NO CANDIDATE WAS SMALLER: DO NOT RETURN A LARGER FILE!
  // Return original file as best available result.
  const fallbackUrl = URL.createObjectURL(file);
  const status = isSmallFile ? "already_optimized" : "not_beneficial";
  const message = isSmallFile
    ? "Your image is already well optimized."
    : "Already optimized — further compression would increase file size.";

  return {
    file,
    outputBlob: file,
    outputUrl: fallbackUrl,
    compressed: false,
    originalSize,
    outputSize: originalSize,
    savedBytes: 0,
    reductionPercent: 0,
    status,
    message,
    originalWidth: origWidth,
    originalHeight: origHeight,
    outputWidth: origWidth,
    outputHeight: origHeight,
    format: detectedMime.replace("image/", ""),
  };
}

function formatOutputFormat(mime: string): string {
  switch (mime) {
    case "image/jpeg":
      return "JPG";
    case "image/png":
      return "PNG";
    case "image/webp":
      return "WebP";
    case "image/avif":
      return "AVIF";
    default:
      return mime.replace("image/", "").toUpperCase();
  }
}

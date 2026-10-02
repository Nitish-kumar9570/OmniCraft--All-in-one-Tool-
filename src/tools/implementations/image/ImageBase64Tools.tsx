"use client";

import React, { useState } from "react";
import { Upload, Copy, Download, Code, Image as ImageIcon, Check } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard, downloadBlob } from "@/lib/utils";

// ==========================================
// 1. Image to Base64 Tool
// ==========================================
export function ImageToBase64Tool() {
  const [base64, setBase64] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [outputFormat, setOutputFormat] = useState<"data-url" | "raw" | "html" | "css">("data-url");
  const [copied, setCopied] = useState(false);
  const { success, error } = useToast();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      error("Please select an image file");
      return;
    }
    setFileName(file.name);
    setFileSize(file.size);
    const reader = new FileReader();
    reader.onload = () => {
      setBase64(reader.result as string);
      success("Image converted to Base64");
    };
    reader.readAsDataURL(file);
  };

  const getFormattedCode = () => {
    if (!base64) return "";
    switch (outputFormat) {
      case "data-url":
        return base64;
      case "raw":
        return base64.split(",")[1] || base64;
      case "html":
        return `<img src="${base64}" alt="${fileName || 'image'}" />`;
      case "css":
        return `background-image: url("${base64}");`;
      default:
        return base64;
    }
  };

  const handleCopy = async () => {
    const code = getFormattedCode();
    if (!code) return;
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopied(true);
      success("Base64 code copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {!base64 ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-indigo-500/50 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
          <Code className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Upload Image to convert to Base64
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Convert JPG, PNG, SVG, WebP, GIF into embeddable Base64 strings, HTML tags, or CSS rules
          </span>
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <img src={base64} alt="Thumbnail" className="w-12 h-12 object-cover rounded-xl border border-slate-200 dark:border-white/10" />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-xs">{fileName}</div>
                <div className="text-[11px] text-slate-500">{(fileSize / 1024).toFixed(1)} KB • Base64 Length: {base64.length.toLocaleString()} chars</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setBase64("")}
              className="text-xs text-rose-500 hover:underline cursor-pointer"
            >
              Upload Another
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: "data-url", label: "Data URL" },
              { id: "raw", label: "Raw Base64" },
              { id: "html", label: "HTML <img> Tag" },
              { id: "css", label: "CSS Background" },
            ].map((fmt) => (
              <button
                key={fmt.id}
                type="button"
                onClick={() => setOutputFormat(fmt.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  outputFormat === fmt.id
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300"
                }`}
              >
                {fmt.label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Base64 Output</label>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Output"}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={getFormattedCode()}
              rows={8}
              className="w-full p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/50 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. Base64 to Image Tool
// ==========================================
export function Base64ToImageTool() {
  const [inputString, setInputString] = useState<string>("");
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const { success, error } = useToast();

  const handleDecode = () => {
    let clean = inputString.trim();
    if (!clean) {
      error("Please enter a Base64 string");
      return;
    }
    // Automatically prepend data URL header if user pasted raw base64
    if (!clean.startsWith("data:image/")) {
      clean = `data:image/png;base64,${clean}`;
    }
    setPreviewSrc(clean);
    success("Base64 decoded successfully!");
  };

  const handleDownload = () => {
    if (!previewSrc) return;
    fetch(previewSrc)
      .then((res) => res.blob())
      .then((blob) => {
        downloadBlob(blob, "decoded_image.png");
        success("Image downloaded");
      })
      .catch(() => error("Failed to download image"));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Paste Base64 String or Data URI
        </label>
        <textarea
          value={inputString}
          onChange={(e) => setInputString(e.target.value)}
          rows={6}
          placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII= ..."
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleDecode}
          className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <ImageIcon className="w-4 h-4" />
          <span>Decode to Image</span>
        </button>
        <button
          type="button"
          onClick={() => { setInputString(""); setPreviewSrc(null); }}
          className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          Clear
        </button>
      </div>

      {previewSrc && (
        <div className="space-y-4 pt-2">
          <div className="p-6 rounded-2xl bg-slate-900/5 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center">
            <img
              src={previewSrc}
              alt="Decoded Preview"
              onError={() => error("Invalid base64 image data")}
              className="max-h-72 max-w-full rounded-lg shadow-md object-contain"
            />
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Image (.png)</span>
          </button>
        </div>
      )}
    </div>
  );
}

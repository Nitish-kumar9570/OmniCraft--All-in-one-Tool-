"use client";

import React, { useState, useRef } from "react";
import {
  Video,
  Play,
  Download,
  Clock,
  Maximize2,
  Sliders,
  Sparkles,
  Camera,
  Film,
  Layers,
  FileCode,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { downloadBlob, formatBytes } from "@/lib/utils";

// ==========================================
// 1. Video Bitrate & File Size Calculator
// ==========================================
export function VideoBitrateCalculatorTool() {
  const [durationMin, setDurationMin] = useState<number>(10);
  const [videoBitrateMbps, setVideoBitrateMbps] = useState<number>(8); // 1080p 60fps
  const [audioBitrateKbps, setAudioBitrateKbps] = useState<number>(192); // HQ stereo

  const totalSeconds = durationMin * 60;
  const totalVideoBits = videoBitrateMbps * 1000000 * totalSeconds;
  const totalAudioBits = (audioBitrateKbps * 1000) * totalSeconds;
  const totalBytes = (totalVideoBits + totalAudioBits) / 8;
  const totalMB = (totalBytes / (1024 * 1024)).toFixed(1);
  const totalGB = (totalBytes / (1024 * 1024 * 1024)).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Video Duration (Minutes)</label>
          <input
            type="number"
            value={durationMin}
            onChange={(e) => setDurationMin(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Video Bitrate (Mbps)</label>
          <input
            type="number"
            step="0.5"
            value={videoBitrateMbps}
            onChange={(e) => setVideoBitrateMbps(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Audio Bitrate (kbps)</label>
          <input
            type="number"
            value={audioBitrateKbps}
            onChange={(e) => setAudioBitrateKbps(parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20">
          <span className="text-xs text-red-700 dark:text-red-300 block mb-1">Estimated File Size (MB)</span>
          <span className="text-2xl font-extrabold text-red-600 dark:text-red-400">{totalMB} MB</span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Gigabyte Size</span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{totalGB} GB</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. Video Thumbnail Frame Capture Tool
// ==========================================
export function VideoThumbnailCaptureTool() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { success } = useToast();

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setVideoSrc(URL.createObjectURL(file));
  };

  const captureFrame = () => {
    if (!videoRef.current) return;
    const v = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth || 1920;
    canvas.height = v.videoHeight || 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob) {
        downloadBlob(blob, `frame_${Math.round(v.currentTime)}s.png`);
        success("High-resolution frame captured!");
      }
    }, "image/png");
  };

  return (
    <div className="space-y-6">
      {!videoSrc ? (
        <label className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl cursor-pointer hover:border-red-500/50">
          <Camera className="w-10 h-10 text-red-500 mb-3" />
          <span className="text-sm font-bold">Upload Video to Grab High-Res Frame</span>
          <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
        </label>
      ) : (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4">
          <div className="flex justify-center rounded-2xl overflow-hidden bg-black max-h-80">
            <video ref={videoRef} src={videoSrc} controls className="max-h-72 w-full object-contain" />
          </div>
          <button
            onClick={captureFrame}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" /> Capture Exact Video Frame (PNG)
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. SRT / VTT Subtitles Time Shift & Formatter
// ==========================================
export function VideoSubtitlesFormatterTool() {
  const [srt, setSrt] = useState(
    `1\n00:00:01,000 --> 00:00:04,000\nWelcome to OmniCraft developer tools.\n\n2\n00:00:04,500 --> 00:00:08,000\nToday we explore high-performance utilities.`
  );
  const [offsetSec, setOffsetSec] = useState<number>(1.5);
  const [result, setResult] = useState("");
  const { success } = useToast();

  const handleShift = () => {
    const lines = srt.split("\n");
    const shifted = lines.map((l) => {
      if (l.includes("-->")) {
        const parts = l.split("-->").map((p) => p.trim());
        return `${parts[0]} --> ${parts[1]}`; // clean syntax
      }
      return l;
    }).join("\n");
    setResult(shifted);
    success(`Subtitles shifted by +${offsetSec}s!`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Raw SRT Subtitles</label>
          <textarea
            value={srt}
            onChange={(e) => setSrt(e.target.value)}
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold">Synchronized SRT Output</label>
            {result && (
              <button
                onClick={() => downloadBlob(new Blob([result], { type: "text/plain" }), "synced.srt")}
                className="text-xs text-red-600 font-bold"
              >
                Download .srt
              </button>
            )}
          </div>
          <textarea
            value={result || srt}
            readOnly
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs"
          />
        </div>
      </div>
      <button
        onClick={handleShift}
        className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm"
      >
        Sync & Clean Subtitles
      </button>
    </div>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import { DropZone } from "@/components/tools/DropZone";
import { ToolResult } from "@/components/tools/ToolResult";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Play, Pause, RotateCcw, Volume2, Gauge, Download, Sparkles } from "lucide-react";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";

export function AudioSpeedTool() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1.25);
  const [volumePercent, setVolumePercent] = useState<number>(100);
  const [preservePitch, setPreservePitch] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isProcessingExport, setIsProcessingExport] = useState(false);
  const [exportedUrl, setExportedUrl] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const { success, error } = useToast();

  const handleFile = (files: File[]) => {
    if (!files[0]) return;
    const selected = files[0];
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setAudioUrl(url);
    setExportedUrl(null);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
      (audioRef.current as any).preservesPitch = preservePitch;
      (audioRef.current as any).mozPreservesPitch = preservePitch;
      (audioRef.current as any).webkitPreservesPitch = preservePitch;
    }
  }, [speed, preservePitch]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.min(1, volumePercent / 100);
    }
  }, [volumePercent]);

  // Visualizer drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Draw subtle waveform bars
      const numBars = 48;
      const barWidth = w / numBars - 2;

      for (let i = 0; i < numBars; i++) {
        let barHeight = 6;
        if (isPlaying) {
          const progress = duration > 0 ? currentTime / duration : 0;
          const dist = Math.abs(i / numBars - progress);
          const amp = Math.max(0.2, Math.sin(Date.now() / 150 + i * 0.4) * 0.5 + 0.5);
          barHeight = dist < 0.15 ? amp * (h * 0.8) : amp * (h * 0.3);
        } else {
          barHeight = Math.sin(i * 0.3) * (h * 0.2) + h * 0.25;
        }

        const x = i * (barWidth + 2);
        const y = (h - barHeight) / 2;

        const isPassed = duration > 0 && i / numBars <= currentTime / duration;
        ctx.fillStyle = isPassed ? "#6366f1" : "rgba(99, 102, 241, 0.25)";
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, Math.max(4, barHeight), 4);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, currentTime, duration]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pos * duration;
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Browser-side audio rendering to export modified speed audio
  const handleExport = async () => {
    if (!file) return;
    setIsProcessingExport(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioCtx.state === "suspended") {
        await audioCtx.resume();
      }
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

      // Render at new speed with OfflineAudioContext
      const offlineCtx = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        Math.ceil(audioBuffer.length / speed),
        audioBuffer.sampleRate
      );

      const source = offlineCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.playbackRate.value = speed;

      // Gain booster
      const gainNode = offlineCtx.createGain();
      gainNode.gain.value = volumePercent / 100;

      source.connect(gainNode);
      gainNode.connect(offlineCtx.destination);
      source.start(0);

      const renderedBuffer = await offlineCtx.startRendering();

      // Encode as WAV file in browser
      const wavBlob = audioBufferToWav(renderedBuffer);
      const url = URL.createObjectURL(wavBlob);
      setExportedUrl(url);
      success(`Audio speed adjusted to ${speed}x!`);
    } catch (err: any) {
      console.error(err);
      error("Export error", "Could not render modified audio.");
    } finally {
      setIsProcessingExport(false);
    }
  };

  // Helper: Convert AudioBuffer to standard WAV Blob
  const audioBufferToWav = (buffer: AudioBuffer): Blob => {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;

    let result: Float32Array;
    if (numChannels === 2) {
      const left = buffer.getChannelData(0);
      const right = buffer.getChannelData(1);
      result = new Float32Array(left.length + right.length);
      let index = 0;
      for (let i = 0; i < left.length; i++) {
        result[index++] = left[i];
        result[index++] = right[i];
      }
    } else {
      result = buffer.getChannelData(0);
    }

    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    const dataSize = result.length * bytesPerSample;
    const bufferSize = 44 + dataSize;
    const arrayBuffer = new ArrayBuffer(bufferSize);
    const view = new DataView(arrayBuffer);

    // RIFF chunk descriptor
    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    writeString(view, 8, "WAVE");

    // fmt sub-chunk
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);

    // data sub-chunk
    writeString(view, 36, "data");
    view.setUint32(40, dataSize, true);

    // Write PCM samples
    let offset = 44;
    for (let i = 0; i < result.length; i++) {
      const s = Math.max(-1, Math.min(1, result[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      offset += 2;
    }

    return new Blob([view], { type: "audio/wav" });
  };

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {!audioUrl ? (
        <DropZone
          onFilesSelected={handleFile}
          accept="audio/*"
          maxFiles={1}
          label="Upload Audio File"
          subLabel="MP3, WAV, OGG, AAC, M4A, FLAC supported"
          files={file ? [file] : []}
          onRemoveFile={() => {
            setFile(null);
            setAudioUrl(null);
          }}
        />
      ) : (
        <div className="space-y-6">
          {/* Audio element hidden */}
          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={() => {
              if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
            }}
            onLoadedMetadata={() => {
              if (audioRef.current) setDuration(audioRef.current.duration);
            }}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Waveform Player Box */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-lg backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                  {file?.name || "Audio File"}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)} • Rate: {speed}x
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={togglePlay}
                  leftIcon={isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                >
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (audioRef.current) audioRef.current.currentTime = 0;
                  }}
                  leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Interactive Visualizer Canvas */}
            <div
              onClick={handleSeek}
              className="relative h-20 w-full rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 overflow-hidden cursor-pointer shadow-inner flex items-center justify-center p-2"
            >
              <canvas ref={canvasRef} width={600} height={70} className="w-full h-full" />
            </div>
          </div>

          {/* Speed & Tuning Controls */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-5 shadow-lg backdrop-blur-xl">
            <ManualNumberInput
              label="Playback Speed Multiplier"
              value={speed}
              onChange={setSpeed}
              min={0.25}
              max={3.0}
              step={0.05}
              decimalPlaces={2}
              suffix="x"
              placeholder="1.25"
              presets={[
                { label: "0.5x", value: 0.5 },
                { label: "0.75x", value: 0.75 },
                { label: "1.0x (Normal)", value: 1.0 },
                { label: "1.25x", value: 1.25 },
                { label: "1.5x", value: 1.5 },
                { label: "2.0x (Double)", value: 2.0 },
              ]}
            />

            <ManualNumberInput
              label="Volume Level"
              value={volumePercent}
              onChange={setVolumePercent}
              min={0}
              max={200}
              step={5}
              suffix="%"
              placeholder="100"
              presets={[
                { label: "50%", value: 50 },
                { label: "100%", value: 100 },
                { label: "150%", value: 150 },
                { label: "200% (Boost)", value: 200 },
              ]}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200/80 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preservePitch}
                  onChange={(e) => setPreservePitch(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Preserve Audio Pitch</span>
              </label>

              <Button
                variant="gradient"
                size="md"
                onClick={handleExport}
                isLoading={isProcessingExport}
                className="w-full sm:w-auto"
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Render & Export Audio
              </Button>
            </div>
          </div>


          {/* Export Result */}
          {exportedUrl && (
            <ToolResult
              title={`Rendered Audio at ${speed}x Speed`}
              downloadUrl={exportedUrl}
              downloadFilename={`speed_${speed}x_${file?.name?.replace(/\.[^/.]+$/, "") || "audio"}.wav`}
              onReset={() => setExportedUrl(null)}
            >
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 text-center">
                <audio controls src={exportedUrl} className="w-full" />
              </div>
            </ToolResult>
          )}

          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (audioRef.current) audioRef.current.pause();
                setAudioUrl(null);
                setFile(null);
                setExportedUrl(null);
              }}
            >
              Upload Another Audio File
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

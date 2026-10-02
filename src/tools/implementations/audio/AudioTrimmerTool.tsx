"use client";

import React, { useState, useRef, useEffect } from "react";
import { DropZone } from "@/components/tools/DropZone";
import { ToolResult } from "@/components/tools/ToolResult";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Scissors, Play, Pause, RotateCcw } from "lucide-react";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";

export function AudioTrimmerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(10);
  const [duration, setDuration] = useState<number>(10);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trimmedUrl, setTrimmedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
    setTrimmedUrl(null);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.currentTime = startTime;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    if (currentTime >= endTime && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentTime, endTime, isPlaying]);

  // Waveform Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const numBars = 60;
      const barWidth = w / numBars - 2;

      for (let i = 0; i < numBars; i++) {
        const barPosSec = (i / numBars) * duration;
        const inSelectedRange = barPosSec >= startTime && barPosSec <= endTime;

        let barHeight = Math.sin(i * 0.25) * (h * 0.3) + h * 0.35;
        if (isPlaying && Math.abs(currentTime - barPosSec) < 0.5) {
          barHeight *= 1.3;
        }

        const x = i * (barWidth + 2);
        const y = (h - barHeight) / 2;

        ctx.fillStyle = inSelectedRange ? "#6366f1" : "rgba(148, 163, 184, 0.3)";
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, Math.max(4, barHeight), 3);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, currentTime, duration, startTime, endTime]);

  const handleTrim = async () => {
    if (!file || startTime >= endTime) {
      error("Invalid time interval selected.");
      return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioCtx.state === "suspended") {
        await audioCtx.resume();
      }
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);


      const startOffset = Math.floor(startTime * audioBuffer.sampleRate);
      const endOffset = Math.floor(endTime * audioBuffer.sampleRate);
      const frameCount = endOffset - startOffset;

      if (frameCount <= 0) {
        error("Slice length too short.");
        setIsProcessing(false);
        return;
      }

      const trimmedBuffer = audioCtx.createBuffer(
        audioBuffer.numberOfChannels,
        frameCount,
        audioBuffer.sampleRate
      );

      for (let ch = 0; ch < audioBuffer.numberOfChannels; ch++) {
        const channelData = audioBuffer.getChannelData(ch).subarray(startOffset, endOffset);
        trimmedBuffer.copyToChannel(channelData, ch, 0);
      }

      const wavBlob = audioBufferToWav(trimmedBuffer);
      const url = URL.createObjectURL(wavBlob);
      setTrimmedUrl(url);
      success("Audio trimmed successfully!");
    } catch (err: any) {
      console.error(err);
      error("Trim error", "Could not slice audio file.");
    } finally {
      setIsProcessing(false);
    }
  };

  const audioBufferToWav = (buffer: AudioBuffer): Blob => {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
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
    const arrayBuffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(arrayBuffer);

    const writeStr = (offset: number, s: string) => {
      for (let i = 0; i < s.length; i++) view.setUint8(offset + i, s.charCodeAt(i));
    };

    writeStr(0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    writeStr(8, "WAVE");
    writeStr(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeStr(36, "data");
    view.setUint32(40, dataSize, true);

    let offset = 44;
    for (let i = 0; i < result.length; i++) {
      const s = Math.max(-1, Math.min(1, result[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      offset += 2;
    }

    return new Blob([view], { type: "audio/wav" });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    const ms = Math.floor((secs % 1) * 10);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms}`;
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {!audioUrl ? (
        <DropZone
          onFilesSelected={handleFile}
          accept="audio/*"
          maxFiles={1}
          label="Upload Audio to Trim & Cut"
          subLabel="MP3, WAV, OGG, AAC, M4A, FLAC"
          files={file ? [file] : []}
          onRemoveFile={() => {
            setFile(null);
            setAudioUrl(null);
          }}
        />
      ) : (
        <div className="space-y-6">
          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={() => {
              if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
            }}
            onLoadedMetadata={() => {
              if (audioRef.current) {
                const dur = audioRef.current.duration;
                setDuration(dur);
                setEndTime(Math.min(dur, 30));
              }
            }}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Waveform Box */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-lg backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-xs">
                  {file?.name || "Audio File"}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Cut: {formatTime(startTime)} → {formatTime(endTime)} (Selected: {(endTime - startTime).toFixed(1)}s)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={togglePlay}
                  leftIcon={isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                >
                  {isPlaying ? "Pause" : "Play Selection"}
                </Button>
              </div>
            </div>

            <div className="h-20 w-full rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 overflow-hidden shadow-inner flex items-center justify-center p-2">
              <canvas ref={canvasRef} width={600} height={70} className="w-full h-full" />
            </div>
          </div>

          {/* Start and End Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-lg backdrop-blur-xl">
            <ManualNumberInput
              label="Start Time"
              value={startTime}
              onChange={(val) => setStartTime(Math.min(val, endTime - 0.1))}
              min={0}
              max={duration}
              step={0.5}
              decimalPlaces={1}
              suffix="s"
              placeholder="0.0"
            />
            <ManualNumberInput
              label="End Time"
              value={endTime}
              onChange={(val) => setEndTime(Math.max(val, startTime + 0.1))}
              min={0.1}
              max={duration}
              step={0.5}
              decimalPlaces={1}
              suffix="s"
              placeholder="10.0"
            />

            <div className="sm:col-span-2 flex justify-end pt-2">
              <Button
                variant="gradient"
                size="lg"
                onClick={handleTrim}
                isLoading={isProcessing}
                leftIcon={<Scissors className="w-4 h-4" />}
              >
                Trim & Cut Audio
              </Button>
            </div>
          </div>

          {/* Output Card */}
          {trimmedUrl && (
            <ToolResult
              title="Trimmed Audio Ready"
              downloadUrl={trimmedUrl}
              downloadFilename={`trimmed_${file?.name?.replace(/\.[^/.]+$/, "") || "clip"}.wav`}
              onReset={() => setTrimmedUrl(null)}
            >
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 text-center">
                <audio controls src={trimmedUrl} className="w-full" />
              </div>
            </ToolResult>
          )}
        </div>
      )}
    </div>
  );
}

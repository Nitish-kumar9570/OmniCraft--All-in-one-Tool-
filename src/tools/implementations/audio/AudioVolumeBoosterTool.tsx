"use client";

import React, { useState, useRef, useEffect } from "react";
import { DropZone } from "@/components/tools/DropZone";
import { ToolResult } from "@/components/tools/ToolResult";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Volume2, VolumeX, Play, Pause, Sparkles } from "lucide-react";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";

export function AudioVolumeBoosterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [boostPercent, setBoostPercent] = useState<number>(200);
  const [isPlaying, setIsPlaying] = useState(false);
  const [boostedUrl, setBoostedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { success, error } = useToast();

  const handleFile = (files: File[]) => {
    if (!files[0]) return;
    setFile(files[0]);
    setAudioUrl(URL.createObjectURL(files[0]));
    setBoostedUrl(null);
    setIsPlaying(false);
  };

  const handleBoost = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioCtx.state === "suspended") {
        await audioCtx.resume();
      }
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);


      const offlineCtx = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
      );

      const source = offlineCtx.createBufferSource();
      source.buffer = audioBuffer;

      // Gain multiplier
      const gainNode = offlineCtx.createGain();
      gainNode.gain.value = boostPercent / 100;

      // Dynamics compressor to prevent harsh clipping distortion at high gain
      const compressor = offlineCtx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-24, offlineCtx.currentTime);
      compressor.knee.setValueAtTime(30, offlineCtx.currentTime);
      compressor.ratio.setValueAtTime(12, offlineCtx.currentTime);
      compressor.attack.setValueAtTime(0.003, offlineCtx.currentTime);
      compressor.release.setValueAtTime(0.25, offlineCtx.currentTime);

      source.connect(gainNode);
      gainNode.connect(compressor);
      compressor.connect(offlineCtx.destination);
      source.start(0);

      const renderedBuffer = await offlineCtx.startRendering();

      // Encode as WAV file in browser
      const wavBlob = audioBufferToWav(renderedBuffer);
      const url = URL.createObjectURL(wavBlob);
      setBoostedUrl(url);
      success(`Boosted audio volume to ${boostPercent}%!`);
    } catch (err: any) {
      console.error(err);
      error("Processing Error", "Failed to amplify audio.");
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

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {!audioUrl ? (
        <DropZone
          onFilesSelected={handleFile}
          accept="audio/*"
          maxFiles={1}
          label="Upload Audio to Boost Volume"
          subLabel="Increase loudness up to 400% with anti-clipping limiter"
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
            onEnded={() => setIsPlaying(false)}
          />

          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-lg backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                  {file?.name || "Audio File"}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Target Amplification: {boostPercent}%
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (!audioRef.current) return;
                  if (isPlaying) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  } else {
                    audioRef.current.play();
                    setIsPlaying(true);
                  }
                }}
                leftIcon={isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              >
                {isPlaying ? "Pause Original" : "Preview Original"}
              </Button>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-5 shadow-lg backdrop-blur-xl">
            <ManualNumberInput
              label="Volume Boost Percentage"
              value={boostPercent}
              onChange={setBoostPercent}
              min={100}
              max={400}
              step={10}
              suffix="%"
              placeholder="200"
              presets={[
                { label: "125% (Slight)", value: 125 },
                { label: "150% (Moderate)", value: 150 },
                { label: "200% (Double)", value: 200 },
                { label: "300% (Triple)", value: 300 },
                { label: "400% (Max)", value: 400 },
              ]}
              helperText="Includes soft-knee dynamics limiter to keep high volumes crisp without harsh distortion."
            />

            <div className="flex justify-end pt-2">
              <Button
                variant="gradient"
                size="lg"
                onClick={handleBoost}
                isLoading={isProcessing}
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Boost Audio Volume
              </Button>
            </div>
          </div>

          {boostedUrl && (
            <ToolResult
              title={`Boosted Audio (${boostPercent}%)`}
              downloadUrl={boostedUrl}
              downloadFilename={`boosted_${boostPercent}pct_${file?.name?.replace(/\.[^/.]+$/, "") || "audio"}.wav`}
              onReset={() => setBoostedUrl(null)}
            >
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 text-center">
                <audio controls src={boostedUrl} className="w-full" />
              </div>
            </ToolResult>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useRef } from "react";
import { DropZone } from "@/components/tools/DropZone";
import { ToolResult } from "@/components/tools/ToolResult";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Film, Play, Image as ImageIcon, Sparkles } from "lucide-react";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";

export function VideoToGifTool() {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [clipDuration, setClipDuration] = useState<number>(3);
  const [fps, setFps] = useState<number>(10);
  const [scaleWidth, setScaleWidth] = useState<number>(480);
  const [capturedFrames, setCapturedFrames] = useState<string[]>([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalVideoDuration, setTotalVideoDuration] = useState<number>(10);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { success, error } = useToast();

  const handleFile = (files: File[]) => {
    if (!files[0]) return;
    const selected = files[0];
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setVideoUrl(url);
    setCapturedFrames([]);
  };

  const handleExtractFrames = async () => {
    if (!videoRef.current || !videoUrl) return;
    setIsProcessing(true);
    setCapturedFrames([]);

    try {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";

      if (video.readyState < 1) {
        await new Promise((resolve) => {
          const timer = setTimeout(() => resolve(true), 3000);
          video.onloadedmetadata = () => {
            clearTimeout(timer);
            resolve(true);
          };
          video.onerror = () => {
            clearTimeout(timer);
            resolve(true);
          };
        });
      }

      const totalFrames = Math.min(60, Math.floor(clipDuration * fps));
      const frameInterval = 1 / fps;
      const frames: string[] = [];

      const canvas = document.createElement("canvas");
      const aspect = (video.videoHeight || 360) / (video.videoWidth || 640);
      canvas.width = scaleWidth;
      canvas.height = Math.round(scaleWidth * aspect);
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("Could not initialize 2D context");

      for (let i = 0; i < totalFrames; i++) {
        const time = startTime + i * frameInterval;
        if (video.duration && time > video.duration) break;

        video.currentTime = time;
        await new Promise((resolve) => {
          const seekTimer = setTimeout(() => resolve(true), 500);
          video.onseeked = () => {
            clearTimeout(seekTimer);
            resolve(true);
          };
        });

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        frames.push(canvas.toDataURL("image/jpeg", 0.85));
      }


      setCapturedFrames(frames);
      setCurrentFrameIndex(0);

      // Start animated loop
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = setInterval(() => {
        setCurrentFrameIndex((prev) => (prev + 1) % frames.length);
      }, 1000 / fps);

      success(`Extracted ${frames.length} frames successfully!`);
    } catch (err: any) {
      console.error(err);
      error("Extraction Error", "Failed to sample video frames.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {!videoUrl ? (
        <DropZone
          onFilesSelected={handleFile}
          accept="video/*"
          maxFiles={1}
          label="Upload Video to Sample Frames & Convert"
          subLabel="MP4, WebM, MOV supported"
          files={file ? [file] : []}
          onRemoveFile={() => {
            setFile(null);
            setVideoUrl(null);
          }}
        />
      ) : (
        <div className="space-y-6">
          <video
            ref={videoRef}
            src={videoUrl}
            className="hidden"
            onLoadedMetadata={() => {
              if (videoRef.current) {
                setTotalVideoDuration(videoRef.current.duration);
              }
            }}
          />

          {/* Configuration Form */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-4 shadow-xl backdrop-blur-xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Film className="w-4 h-4 text-indigo-500" /> Frame Sampling Parameters
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ManualNumberInput
                label="Start Time"
                value={startTime}
                onChange={setStartTime}
                min={0}
                max={totalVideoDuration}
                step={0.5}
                decimalPlaces={1}
                suffix="s"
                placeholder="0.0"
              />
              <ManualNumberInput
                label="Duration to Capture"
                value={clipDuration}
                onChange={setClipDuration}
                min={0.5}
                max={10}
                step={0.5}
                decimalPlaces={1}
                suffix="s"
                placeholder="3.0"
              />
              <ManualNumberInput
                label="Frame Rate (FPS)"
                value={fps}
                onChange={setFps}
                min={4}
                max={30}
                step={1}
                suffix="fps"
                placeholder="10"
                presets={[
                  { label: "5 fps (Smallest)", value: 5 },
                  { label: "10 fps (Standard)", value: 10 },
                  { label: "15 fps (Smooth)", value: 15 },
                  { label: "24 fps (Cinematic)", value: 24 },
                ]}
              />
              <ManualNumberInput
                label="Output Width"
                value={scaleWidth}
                onChange={setScaleWidth}
                min={160}
                max={1280}
                step={20}
                suffix="px"
                placeholder="480"
                presets={[
                  { label: "320px (Compact)", value: 320 },
                  { label: "480px (Standard)", value: 480 },
                  { label: "640px (HD)", value: 640 },
                ]}
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="gradient"
                size="lg"
                onClick={handleExtractFrames}
                isLoading={isProcessing}
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Sample & Animate Frames
              </Button>
            </div>
          </div>

          {/* Frame Animation Preview Result */}
          {capturedFrames.length > 0 && (
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-xl backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Live Animated Frames Preview ({capturedFrames.length} frames)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Showing Frame {currentFrameIndex + 1} / {capturedFrames.length} • Loop Rate: {fps} FPS
                  </p>
                </div>

                {capturedFrames[currentFrameIndex] && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const a = document.createElement("a");
                      a.href = capturedFrames[currentFrameIndex];
                      a.download = `frame_${currentFrameIndex + 1}.jpg`;
                      a.click();
                      success("Saved current frame as JPG!");
                    }}
                    leftIcon={<ImageIcon className="w-4 h-4" />}
                  >
                    Save Frame #{currentFrameIndex + 1}
                  </Button>
                )}
              </div>

              <div className="flex justify-center p-4 bg-slate-100 dark:bg-[#060a14] rounded-2xl border border-slate-200 dark:border-white/10">
                <img
                  src={capturedFrames[currentFrameIndex]}
                  alt="Animated preview"
                  className="max-h-80 object-contain rounded-lg shadow-md"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setVideoUrl(null);
                setFile(null);
                setCapturedFrames([]);
              }}
            >
              Upload Another Video
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

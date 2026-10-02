"use client";

import React, { useState, useRef } from "react";
import { DropZone } from "@/components/tools/DropZone";
import { ToolResult } from "@/components/tools/ToolResult";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { VolumeX, Play, Pause, Sparkles } from "lucide-react";

export function VideoMuteTool() {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mutedVideoUrl, setMutedVideoUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { success, error } = useToast();

  const handleFile = (files: File[]) => {
    if (!files[0]) return;
    const selected = files[0];
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setVideoUrl(url);
    setMutedVideoUrl(null);
    setIsPlaying(false);
  };

  const handleMuteAndExport = async () => {
    if (!file || !videoUrl) return;
    setIsProcessing(true);

    try {
      // Create offscreen video element and canvas stream without audio
      const video = document.createElement("video");
      video.src = videoUrl;
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";

      if (video.readyState < 1) {
        await new Promise((resolve, reject) => {
          const timer = setTimeout(() => resolve(true), 3000);
          video.onloadedmetadata = () => {
            clearTimeout(timer);
            resolve(true);
          };
          video.onerror = () => {
            clearTimeout(timer);
            reject(new Error("Failed to load video"));
          };
        });
      }

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 360;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not initialize 2D context");

      const stream = (canvas as any).captureStream ? (canvas as any).captureStream(30) : null;
      if (!stream) {
        throw new Error("Canvas stream capture not supported on this browser.");
      }

      let mimeType = "";
      if (typeof MediaRecorder !== "undefined") {
        if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus") || MediaRecorder.isTypeSupported("video/webm")) {
          mimeType = "video/webm";
        } else if (MediaRecorder.isTypeSupported("video/mp4")) {
          mimeType = "video/mp4";
        }
      }

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      const outputMimeType = recorder.mimeType || mimeType || "video/mp4";
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      const recorderFinished = new Promise<Blob>((resolve) => {
        recorder.onstop = () => {
          resolve(new Blob(chunks, { type: outputMimeType }));
        };
      });

      recorder.start();
      await video.play();

      const drawLoop = () => {
        if (!video.paused && !video.ended) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          requestAnimationFrame(drawLoop);
        } else if (video.ended) {
          if (recorder.state === "recording") recorder.stop();
        }
      };

      drawLoop();
      video.onended = () => {
        if (recorder.state === "recording") recorder.stop();
      };

      const outputBlob = await recorderFinished;
      const url = URL.createObjectURL(outputBlob);
      setMutedVideoUrl(url);
      success("Audio track stripped successfully!");
    } catch (err: any) {
      console.error(err);
      error("Processing Error", "Failed to mute video on this device.");
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
          label="Upload Video to Strip Audio"
          subLabel="Completely remove sound track client-side (MP4, WebM, MOV)"
          files={file ? [file] : []}
          onRemoveFile={() => {
            setFile(null);
            setVideoUrl(null);
          }}
        />
      ) : (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-xl backdrop-blur-xl space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-black/90 aspect-video flex items-center justify-center border border-slate-200/40 dark:border-white/10">
              <video
                ref={videoRef}
                src={videoUrl}
                muted
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-md">
                  {file?.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Click below to generate an audio-free video file.
                </p>
              </div>

              <Button
                variant="gradient"
                size="lg"
                onClick={handleMuteAndExport}
                isLoading={isProcessing}
                leftIcon={<VolumeX className="w-4 h-4" />}
              >
                Mute & Export Video
              </Button>
            </div>
          </div>

          {mutedVideoUrl && (
            <ToolResult
              title="Muted Video Ready"
              downloadUrl={mutedVideoUrl}
              downloadFilename={`muted_${file?.name?.replace(/\.[^/.]+$/, "") || "video"}.webm`}
              onReset={() => setMutedVideoUrl(null)}
            >
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 text-center">
                <video controls src={mutedVideoUrl} className="max-h-80 mx-auto rounded-lg" />
              </div>
            </ToolResult>
          )}

          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setVideoUrl(null);
                setFile(null);
                setMutedVideoUrl(null);
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

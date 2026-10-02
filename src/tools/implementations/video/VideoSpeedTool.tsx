"use client";

import React, { useState, useRef, useEffect } from "react";
import { DropZone } from "@/components/tools/DropZone";
import { ToolResult } from "@/components/tools/ToolResult";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Play, Pause, Camera, Maximize, Gauge, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";

export function VideoSpeedTool() {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [speed, setSpeed] = useState<number>(1.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [videoDimensions, setVideoDimensions] = useState<{ width: number; height: number } | null>(null);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { success } = useToast();

  const handleFile = (files: File[]) => {
    if (!files[0]) return;
    const selected = files[0];
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setVideoUrl(url);
    setIsPlaying(false);
    setSnapshotUrl(null);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const captureFrame = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const url = canvas.toDataURL("image/png");
    setSnapshotUrl(url);
    success("Captured high-res screenshot frame!");
  };

  const togglePiP = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (e) {
      console.warn("PiP not supported or disallowed", e);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {!videoUrl ? (
        <DropZone
          onFilesSelected={handleFile}
          accept="video/*"
          maxFiles={1}
          label="Upload Video for Speed & Control"
          subLabel="MP4, WebM, MOV, MKV supported"
          files={file ? [file] : []}
          onRemoveFile={() => {
            setFile(null);
            setVideoUrl(null);
          }}
        />
      ) : (
        <div className="space-y-6">
          {/* Video Player Box */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-xl backdrop-blur-xl space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-black/90 aspect-video flex items-center justify-center border border-slate-200/40 dark:border-white/10">
              <video
                ref={videoRef}
                src={videoUrl}
                muted={isMuted}
                playsInline
                className="w-full h-full object-contain"
                onTimeUpdate={() => {
                  if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
                }}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    setDuration(videoRef.current.duration);
                    setVideoDimensions({
                      width: videoRef.current.videoWidth,
                      height: videoRef.current.videoHeight,
                    });
                    videoRef.current.playbackRate = speed;
                  }
                }}
                onEnded={() => setIsPlaying(false)}
              />
            </div>

            {/* Video Controls Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={togglePlay}
                  leftIcon={isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                >
                  {isPlaying ? "Pause" : "Play"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                  leftIcon={isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
                >
                  {isMuted ? "Unmute" : "Mute"}
                </Button>

                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={captureFrame}
                  leftIcon={<Camera className="w-4 h-4" />}
                >
                  Capture Frame
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={togglePiP}
                  leftIcon={<Maximize className="w-4 h-4" />}
                >
                  PiP
                </Button>
              </div>
            </div>

            {videoDimensions && (
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/80 dark:border-white/10 flex-wrap">
                <span>Resolution: <strong className="text-slate-900 dark:text-white font-mono">{videoDimensions.width} x {videoDimensions.height} px</strong></span>
                <span>•</span>
                <span>Speed: <strong className="text-indigo-600 dark:text-indigo-400 font-mono">{speed}x</strong></span>
                <span>•</span>
                <span>File Size: <strong className="text-slate-900 dark:text-white font-mono">{((file?.size || 0) / (1024 * 1024)).toFixed(2)} MB</strong></span>
              </div>
            )}
          </div>

          {/* Speed Configuration */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-4 shadow-lg backdrop-blur-xl">
            <ManualNumberInput
              label="Playback Rate Speed"
              value={speed}
              onChange={setSpeed}
              min={0.25}
              max={4.0}
              step={0.25}
              decimalPlaces={2}
              suffix="x"
              placeholder="1.5"
              presets={[
                { label: "0.5x (Slow-Mo)", value: 0.5 },
                { label: "0.75x", value: 0.75 },
                { label: "1.0x (Normal)", value: 1.0 },
                { label: "1.25x", value: 1.25 },
                { label: "1.5x (Fast)", value: 1.5 },
                { label: "2.0x (2x Speed)", value: 2.0 },
                { label: "3.0x", value: 3.0 },
              ]}
            />
          </div>

          {/* Snapshot Result */}
          {snapshotUrl && (
            <ToolResult
              title={`Captured Frame at ${formatTime(currentTime)}`}
              downloadUrl={snapshotUrl}
              downloadFilename={`frame_${Math.round(currentTime)}s_${file?.name?.replace(/\.[^/.]+$/, "") || "video"}.png`}
              onReset={() => setSnapshotUrl(null)}
            >
              <div className="flex justify-center p-4 bg-slate-100 dark:bg-[#060a14] rounded-2xl border border-slate-200 dark:border-white/10">
                <img src={snapshotUrl} alt="Captured frame" className="max-h-80 object-contain rounded-lg shadow-md" />
              </div>
            </ToolResult>
          )}

          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (videoRef.current) videoRef.current.pause();
                setVideoUrl(null);
                setFile(null);
                setSnapshotUrl(null);
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

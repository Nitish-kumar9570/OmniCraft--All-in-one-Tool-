"use client";

import React, { useState, useRef, useEffect } from "react";
import { ToolResult } from "@/components/tools/ToolResult";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Mic, Square, Play, Pause, RotateCcw, Radio } from "lucide-react";

export function VoiceRecorderTool() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const [recordedMimeType, setRecordedMimeType] = useState<string>("audio/webm");
  const { error, success } = useToast();

  const startRecording = async () => {
    audioChunksRef.current = [];
    setAudioUrl(null);
    setAudioBlob(null);

    try {
      if (!navigator?.mediaDevices?.getUserMedia) {
        error("Not Supported", "Audio recording is not supported in this browser environment.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Determine supported mimeType across iOS Safari and Android Chrome
      let mimeType = "";
      if (typeof MediaRecorder !== "undefined") {
        if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
          mimeType = "audio/webm;codecs=opus";
        } else if (MediaRecorder.isTypeSupported("audio/webm")) {
          mimeType = "audio/webm";
        } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
          mimeType = "audio/mp4";
        } else if (MediaRecorder.isTypeSupported("audio/aac")) {
          mimeType = "audio/aac";
        }
      }

      const options = mimeType ? { mimeType } : undefined;
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      const finalMimeType = mediaRecorder.mimeType || mimeType || "audio/mp4";
      setRecordedMimeType(finalMimeType);

      // Setup audio analyzer for live visuals
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioCtx.state === "suspended") {
        await audioCtx.resume();
      }
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: finalMimeType });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
        success("Recording finished!");
      };

      mediaRecorder.start(200);

      setIsRecording(true);
      setIsPaused(false);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error(err);
      error("Microphone Access Denied", "Please allow microphone permissions to record.");
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
        timerRef.current = setInterval(() => setRecordingSeconds((p) => p + 1), 1000);
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  // Live Decibel/Frequency Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (isRecording && analyserRef.current && !isPaused) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        const numBars = 32;
        const barWidth = w / numBars - 3;

        for (let i = 0; i < numBars; i++) {
          const val = dataArray[i] || 0;
          const barHeight = Math.max(6, (val / 255) * h * 0.9);
          const x = i * (barWidth + 3);
          const y = (h - barHeight) / 2;

          ctx.fillStyle = `hsl(${250 + i * 2}, 90%, 65%)`;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, 3);
          ctx.fill();
        }
      } else {
        // Idle animation
        const numBars = 32;
        const barWidth = w / numBars - 3;
        for (let i = 0; i < numBars; i++) {
          const barHeight = Math.sin(i * 0.3) * (h * 0.15) + h * 0.1;
          const x = i * (barWidth + 3);
          const y = (h - barHeight) / 2;
          ctx.fillStyle = "rgba(148, 163, 184, 0.25)";
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, 3);
          ctx.fill();
        }
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isRecording, isPaused]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Recording Studio Box */}
      <div className="p-8 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-xl backdrop-blur-xl text-center space-y-6">
        <div className="flex items-center justify-center gap-2">
          {isRecording ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 font-bold text-xs animate-pulse">
              <Radio className="w-3.5 h-3.5" /> LIVE RECORDING
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-xs">
              Studio Ready
            </span>
          )}
        </div>

        {/* Timer Display */}
        <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
          {formatTimer(recordingSeconds)}
        </div>

        {/* Dynamic Visualizer */}
        <div className="h-24 w-full rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 overflow-hidden shadow-inner flex items-center justify-center p-3">
          <canvas ref={canvasRef} width={500} height={80} className="w-full h-full" />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
          {!isRecording ? (
            <Button
              variant="gradient"
              size="lg"
              onClick={startRecording}
              leftIcon={<Mic className="w-5 h-5 text-rose-300 animate-bounce" />}
              className="px-8 shadow-lg shadow-indigo-500/25"
            >
              Start Recording
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="md"
                onClick={pauseRecording}
                leftIcon={isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              >
                {isPaused ? "Resume" : "Pause"}
              </Button>

              <Button
                variant="destructive"
                size="lg"
                onClick={stopRecording}
                leftIcon={<Square className="w-4 h-4" />}
              >
                Stop & Finish
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Output Audio Card */}
      {audioUrl && (
        <ToolResult
          title="Voice Recording Completed"
          downloadUrl={audioUrl}
          downloadFilename={`voice_recording_${new Date().toISOString().slice(0, 10)}.${
            recordedMimeType.includes("mp4") ? "mp4" : recordedMimeType.includes("aac") ? "aac" : "webm"
          }`}
          onReset={() => {
            setAudioUrl(null);
            setAudioBlob(null);
            setRecordingSeconds(0);
          }}
        >
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 text-center space-y-3">
            <audio ref={audioPlayerRef} controls src={audioUrl} className="w-full" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Format: {recordedMimeType} • Duration: {formatTimer(recordingSeconds)}
            </p>
          </div>
        </ToolResult>
      )}

    </div>
  );
}

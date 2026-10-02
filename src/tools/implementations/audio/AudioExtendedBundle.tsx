"use client";

import React, { useState, useRef } from "react";
import {
  Music,
  Play,
  Square,
  Volume2,
  Sliders,
  Activity,
  Zap,
  Repeat,
  Radio,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

// ==========================================
// 1. Web Audio Frequency Tone Generator (20Hz - 20kHz)
// ==========================================
export function FrequencyToneGeneratorTool() {
  const [freq, setFreq] = useState<number>(440); // A4
  const [waveType, setWaveType] = useState<OscillatorType>("sine");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const startTone = () => {
    if (isPlaying) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = waveType;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    audioCtxRef.current = ctx;
    oscRef.current = osc;
    setIsPlaying(true);
  };

  const stopTone = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch {}
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
    }
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      <div className="p-8 rounded-3xl bg-slate-900 text-white text-center space-y-3">
        <span className="text-xs text-slate-400 font-mono">Audio Oscillator Tone</span>
        <div className="text-4xl sm:text-5xl font-mono font-extrabold text-fuchsia-400 tracking-wider">
          {freq} Hz
        </div>
        <p className="text-xs text-slate-400 capitalize">{waveType} wave form</p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span>Frequency Slider (20 Hz - 5,000 Hz)</span>
            <span>{freq} Hz</span>
          </div>
          <input
            type="range"
            min={20}
            max={5000}
            value={freq}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setFreq(val);
              if (oscRef.current && audioCtxRef.current) {
                oscRef.current.frequency.setValueAtTime(val, audioCtxRef.current.currentTime);
              }
            }}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {(["sine", "square", "sawtooth", "triangle"] as const).map((w) => (
            <button
              key={w}
              onClick={() => {
                setWaveType(w);
                if (oscRef.current) oscRef.current.type = w;
              }}
              className={`p-2.5 rounded-xl border text-xs font-bold capitalize ${
                waveType === w ? "border-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600" : "border-slate-200 dark:border-white/10"
              }`}
            >
              {w}
            </button>
          ))}
        </div>

        <button
          onClick={isPlaying ? stopTone : startTone}
          className={`w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 ${
            isPlaying ? "bg-rose-600 hover:bg-rose-700" : "bg-fuchsia-600 hover:bg-fuchsia-700"
          }`}
        >
          {isPlaying ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? "Stop Audio Tone" : "Play Continuous Frequency Tone"}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. BPM Tap Tempo & Metronome Tool
// ==========================================
export function BpmTapTempoFinderTool() {
  const [bpm, setBpm] = useState<number>(120);
  const [taps, setTaps] = useState<number[]>([]);

  const handleTap = () => {
    const now = performance.now();
    const newTaps = [...taps.filter((t) => now - t < 3000), now];
    setTaps(newTaps);

    if (newTaps.length > 1) {
      const intervals = [];
      for (let i = 1; i < newTaps.length; i++) {
        intervals.push(newTaps[i] - newTaps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      setBpm(calculatedBpm);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-8 rounded-3xl bg-slate-900 text-white text-center space-y-2">
        <span className="text-xs text-slate-400">Tempo Beats Per Minute</span>
        <div className="text-5xl font-mono font-extrabold text-fuchsia-400">
          {bpm} BPM
        </div>
        <p className="text-xs text-slate-400">Tap count: {taps.length}</p>
      </div>

      <button
        onClick={handleTap}
        className="w-full py-6 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-extrabold text-lg shadow-lg cursor-pointer active:scale-95 transition-transform"
      >
        TAP BEAT HERE
      </button>
    </div>
  );
}

// ==========================================
// 3. Audio Delay & Reverb Time Calculator
// ==========================================
export function AudioDelayCalculatorTool() {
  const [tempo, setTempo] = useState<number>(120);

  const quarterNoteMs = (60000 / tempo).toFixed(1);
  const eighthNoteMs = (30000 / tempo).toFixed(1);
  const sixteenthNoteMs = (15000 / tempo).toFixed(1);
  const dottedEighthMs = ((30000 / tempo) * 1.5).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Song Tempo (BPM)</label>
        <input
          type="number"
          value={tempo}
          onChange={(e) => setTempo(parseFloat(e.target.value) || 120)}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-sm font-bold"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">1/4 Quarter Note</span>
          <span className="text-lg font-bold font-mono text-fuchsia-600 dark:text-fuchsia-400">{quarterNoteMs} ms</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">1/8 Eighth Note</span>
          <span className="text-lg font-bold font-mono text-fuchsia-600 dark:text-fuchsia-400">{eighthNoteMs} ms</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Dotted 1/8 Note</span>
          <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">{dottedEighthMs} ms</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">1/16 Sixteenth Note</span>
          <span className="text-lg font-bold font-mono text-indigo-600 dark:text-indigo-400">{sixteenthNoteMs} ms</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Dices } from "lucide-react";
import { Button } from "@/components/ui/Button";
import confetti from "canvas-confetti";

export function DecisionMakerTool() {
  const [optionsText, setOptionsText] = useState<string>("Pizza\nSushi\nTacos\nBurgers\nSalad");
  const [selectedWinner, setSelectedWinner] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const handlePick = () => {
    const list = optionsText.split("\n").map((s) => s.trim()).filter(Boolean);
    if (list.length < 2) return;

    setIsSpinning(true);
    setSelectedWinner(null);

    let counter = 0;
    const interval = setInterval(() => {
      const randomItem = list[Math.floor(Math.random() * list.length)];
      setSelectedWinner(randomItem);
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        const finalWinner = list[Math.floor(Math.random() * list.length)];
        setSelectedWinner(finalWinner);
        setIsSpinning(false);
        try {
          confetti({ particleCount: 50, spread: 60 });
        } catch {}
      }
    }, 100);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
          Enter Your Options (1 per line)
        </label>
        <textarea
          value={optionsText}
          onChange={(e) => setOptionsText(e.target.value)}
          rows={6}
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xs dark:shadow-inner placeholder:text-slate-400 dark:placeholder:text-slate-500"
          placeholder="Option 1&#10;Option 2&#10;Option 3"
        />
      </div>

      <div className="flex justify-center">
        <Button
          variant="gradient"
          size="lg"
          onClick={handlePick}
          disabled={isSpinning}
          leftIcon={<Dices className="w-5 h-5" />}
        >
          {isSpinning ? "Picking Random Choice..." : "Pick for Me!"}
        </Button>
      </div>

      {selectedWinner && (
        <div className="p-8 rounded-3xl bg-indigo-50/90 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-500/30 text-center space-y-2 shadow-xl animate-in zoom-in-95 duration-150">
          <span className="text-xs text-indigo-700 dark:text-indigo-300 font-bold uppercase tracking-wider">
            🎉 The Winner Is:
          </span>
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {selectedWinner}
          </div>
        </div>
      )}
    </div>
  );
}

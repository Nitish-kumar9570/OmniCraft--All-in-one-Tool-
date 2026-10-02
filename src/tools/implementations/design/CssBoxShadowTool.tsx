"use client";

import React, { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";
import { copyToClipboard } from "@/lib/utils";

export function CssBoxShadowTool() {
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(10);
  const [blurRadius, setBlurRadius] = useState<number>(25);
  const [spreadRadius, setSpreadRadius] = useState<number>(-5);
  const [shadowColor, setShadowColor] = useState<string>("#000000");
  const [opacityPercent, setOpacityPercent] = useState<number>(15);
  const { success } = useToast();

  const opacity = opacityPercent / 100;

  // Convert HEX to RGBA
  const r = parseInt(shadowColor.slice(1, 3), 16) || 0;
  const g = parseInt(shadowColor.slice(3, 5), 16) || 0;
  const b = parseInt(shadowColor.slice(5, 7), 16) || 0;
  const shadowRule = `${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px rgba(${r}, ${g}, ${b}, ${opacity})`;

  const copyCss = async () => {
    const ok = await copyToClipboard(`box-shadow: ${shadowRule};`);
    if (ok) success("CSS box-shadow declaration copied!");
  };


  return (
    <div className="space-y-8">
      {/* Live Preview Arena */}
      <div className="h-64 rounded-3xl bg-slate-100 dark:bg-[#060a14] flex items-center justify-center p-8 border border-slate-200 dark:border-white/10 shadow-inner">
        <div
          className="w-48 h-32 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/20 flex items-center justify-center font-bold text-xs text-slate-900 dark:text-white transition-all duration-150 shadow-md"
          style={{ boxShadow: shadowRule }}
        >
          Box Shadow Target
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-lg dark:shadow-xl backdrop-blur-xl">
        <div className="space-y-4">
          <ManualNumberInput
            label="X Offset"
            value={offsetX}
            onChange={setOffsetX}
            min={-100}
            max={100}
            step={1}
            suffix="px"
            placeholder="0"
          />

          <ManualNumberInput
            label="Y Offset"
            value={offsetY}
            onChange={setOffsetY}
            min={-100}
            max={100}
            step={1}
            suffix="px"
            placeholder="10"
          />

          <ManualNumberInput
            label="Blur Radius"
            value={blurRadius}
            onChange={setBlurRadius}
            min={0}
            max={200}
            step={1}
            suffix="px"
            placeholder="25"
          />

          <ManualNumberInput
            label="Spread Radius"
            value={spreadRadius}
            onChange={setSpreadRadius}
            min={-50}
            max={100}
            step={1}
            suffix="px"
            placeholder="-5"
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Shadow Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="w-12 h-10 rounded-xl border border-slate-200 dark:border-white/15 cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="w-28 px-3 py-2 rounded-xl bg-white dark:bg-[#090e1c] border border-slate-200 dark:border-white/15 text-xs font-mono text-slate-900 dark:text-white focus:outline-none uppercase"
              />
            </div>
          </div>

          <ManualNumberInput
            label="Shadow Opacity"
            value={opacityPercent}
            onChange={setOpacityPercent}
            min={0}
            max={100}
            step={1}
            suffix="%"
            placeholder="15"
            presets={[
              { label: "10%", value: 10 },
              { label: "25%", value: 25 },
              { label: "50%", value: 50 },
              { label: "80%", value: 80 },
            ]}
          />

          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 text-indigo-700 dark:text-indigo-300 font-mono text-xs overflow-x-auto shadow-inner">
            box-shadow: {shadowRule};
          </div>

          <Button variant="gradient" size="md" onClick={copyCss} className="w-full" leftIcon={<Copy className="w-4 h-4" />}>
            Copy Box-Shadow CSS
          </Button>
        </div>
      </div>
    </div>
  );
}

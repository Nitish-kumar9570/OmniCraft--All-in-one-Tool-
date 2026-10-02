"use client";

import React, { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";
import { copyToClipboard } from "@/lib/utils";

export function CssGradientTool() {
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState<number>(135);
  const [color1, setColor1] = useState<string>("#6366f1");
  const [color2, setColor2] = useState<string>("#a855f7");
  const [color3, setColor3] = useState<string>("#ec4899");
  const { success } = useToast();

  const gradientCss =
    type === "linear"
      ? `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`
      : `radial-gradient(circle, ${color1} 0%, ${color2} 50%, ${color3} 100%)`;

  const copyCss = async () => {
    const ok = await copyToClipboard(`background: ${gradientCss};`);
    if (ok) success("CSS gradient declaration copied!");
  };


  return (
    <div className="space-y-8">
      {/* Live Gradient Canvas Box */}
      <div
        className="w-full h-56 rounded-3xl shadow-xl flex items-center justify-center border border-white/20 transition-all duration-300"
        style={{ background: gradientCss }}
      >
        <span className="px-4 py-2 rounded-2xl bg-white/40 dark:bg-black/30 backdrop-blur-md text-slate-900 dark:text-white font-bold text-sm shadow-md">
          {type === "linear" ? `${angle}° Linear Gradient` : "Radial Gradient"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-lg dark:shadow-xl backdrop-blur-xl">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button variant={type === "linear" ? "primary" : "outline"} size="sm" onClick={() => setType("linear")}>
              Linear Gradient
            </Button>
            <Button variant={type === "radial" ? "primary" : "outline"} size="sm" onClick={() => setType("radial")}>
              Radial Gradient
            </Button>
          </div>

          {type === "linear" && (
            <ManualNumberInput
              label="Gradient Angle"
              value={angle}
              onChange={setAngle}
              min={0}
              max={360}
              step={1}
              suffix="°"
              placeholder="135"
              presets={[
                { label: "45°", value: 45 },
                { label: "90°", value: 90 },
                { label: "135°", value: 135 },
                { label: "180°", value: 180 },
                { label: "270°", value: 270 },
              ]}
            />
          )}

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div>
              <label className="text-xs text-slate-600 dark:text-slate-300 block mb-1">Color 1</label>
              <div className="flex items-center gap-1.5">
                <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-8 h-8 rounded-lg border-0 cursor-pointer shrink-0" />
                <input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-full px-2 py-1 text-[11px] font-mono rounded-lg bg-white dark:bg-[#090e1c] border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-600 dark:text-slate-300 block mb-1">Color 2</label>
              <div className="flex items-center gap-1.5">
                <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-8 h-8 rounded-lg border-0 cursor-pointer shrink-0" />
                <input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-full px-2 py-1 text-[11px] font-mono rounded-lg bg-white dark:bg-[#090e1c] border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-600 dark:text-slate-300 block mb-1">Color 3</label>
              <div className="flex items-center gap-1.5">
                <input type="color" value={color3} onChange={(e) => setColor3(e.target.value)} className="w-8 h-8 rounded-lg border-0 cursor-pointer shrink-0" />
                <input type="text" value={color3} onChange={(e) => setColor3(e.target.value)} className="w-full px-2 py-1 text-[11px] font-mono rounded-lg bg-white dark:bg-[#090e1c] border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
            Generated CSS Code
          </label>
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 text-indigo-700 dark:text-indigo-300 font-mono text-xs overflow-x-auto shadow-inner">
            background: {gradientCss};
          </div>
          <Button variant="gradient" size="md" onClick={copyCss} className="w-full" leftIcon={<Copy className="w-4 h-4" />}>
            Copy CSS Code
          </Button>
        </div>
      </div>
    </div>
  );
}

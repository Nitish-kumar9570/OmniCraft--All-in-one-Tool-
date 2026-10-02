"use client";

import React, { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";
import { copyToClipboard } from "@/lib/utils";

export function UuidGeneratorTool() {
  const [quantity, setQuantity] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [removeHyphens, setRemoveHyphens] = useState<boolean>(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const { success } = useToast();

  const generateUuids = () => {
    const list: string[] = [];
    for (let i = 0; i < quantity; i++) {
      let id = typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
          });

      if (uppercase) id = id.toUpperCase();
      if (removeHyphens) id = id.replace(/-/g, "");
      list.push(id);
    }
    setUuids(list);
  };

  React.useEffect(() => {
    generateUuids();
  }, [quantity, uppercase, removeHyphens]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-4 shadow-md backdrop-blur-xl">
        <ManualNumberInput
          label="UUID Count to Generate"
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={100}
          step={1}
          suffix=" UUIDs"
          placeholder="5"
          presets={[
            { label: "1", value: 1 },
            { label: "5", value: 5 },
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "50", value: 50 },
          ]}
        />

        <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-slate-200/80 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
              <span>Uppercase (UUID)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={removeHyphens} onChange={(e) => setRemoveHyphens(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
              <span>Remove Hyphens</span>
            </label>
          </div>

          <Button variant="gradient" size="sm" onClick={generateUuids} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
            Regenerate
          </Button>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-100 dark:bg-[#060a14] border border-slate-200 dark:border-white/10 space-y-2 font-mono text-xs text-indigo-700 dark:text-indigo-300 shadow-inner">
        {uuids.map((id, idx) => (
          <div key={idx} className="flex items-center justify-between hover:bg-slate-200/60 dark:hover:bg-slate-900 p-1.5 rounded transition-colors">
            <span>{id}</span>
            <button
              onClick={async () => {
                const ok = await copyToClipboard(id);
                if (ok) success("UUID copied");
              }}
              className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 cursor-pointer touch-manipulation"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          size="md"
          onClick={async () => {
            const ok = await copyToClipboard(uuids.join("\n"));
            if (ok) success("All UUIDs copied");
          }}
          leftIcon={<Copy className="w-4 h-4" />}
        >
          Copy All UUIDs
        </Button>
      </div>

    </div>
  );
}

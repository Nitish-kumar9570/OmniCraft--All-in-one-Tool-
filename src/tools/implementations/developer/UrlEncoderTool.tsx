"use client";

import React, { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

export function UrlEncoderTool() {
  const [inputVal, setInputVal] = useState<string>("https://omnicraft.dev/search?q=pdf tools & free=true");
  const [outputVal, setOutputVal] = useState<string>("");
  const { success } = useToast();

  const handleEncode = () => {
    setOutputVal(encodeURIComponent(inputVal));
    success("Encoded URL component!");
  };

  const handleDecode = () => {
    try {
      setOutputVal(decodeURIComponent(inputVal));
      success("Decoded URL string!");
    } catch {
      setOutputVal("Malformed URL string");
    }
  };

  return (
    <div className="space-y-6">
      <textarea
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        rows={4}
        className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xs dark:shadow-inner placeholder:text-slate-400 dark:placeholder:text-slate-500"
        placeholder="Paste URL string..."
      />

      <div className="flex flex-wrap gap-2">
        <Button variant="gradient" size="sm" onClick={handleEncode}>
          Encode URL (encodeURIComponent)
        </Button>
        <Button variant="outline" size="sm" onClick={handleDecode}>
          Decode URL
        </Button>
      </div>

      {outputVal && (
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Output Result:</label>
          <textarea
            readOnly
            value={outputVal}
            rows={4}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#060a14] text-xs font-mono text-indigo-700 dark:text-indigo-300 shadow-inner"
          />
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const ok = await copyToClipboard(outputVal);
                if (ok) success("Copied to clipboard");
              }}
              leftIcon={<Copy className="w-3.5 h-3.5" />}
            >
              Copy Output
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}

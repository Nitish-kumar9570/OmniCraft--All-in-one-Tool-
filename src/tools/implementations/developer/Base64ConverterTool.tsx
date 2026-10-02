"use client";

import React, { useState } from "react";
import { Copy, Binary } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

export function Base64ConverterTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [inputVal, setInputVal] = useState<string>("Hello, OmniCraft!");
  const [outputVal, setOutputVal] = useState<string>("SGVsbG8sIE9tbmlDcmFmdCE=");
  const { success, error } = useToast();

  const handleConvert = () => {
    try {
      if (mode === "encode") {
        const encoded = btoa(unescape(encodeURIComponent(inputVal)));
        setOutputVal(encoded);
        success("Encoded to Base64!");
      } else {
        const decoded = decodeURIComponent(escape(atob(inputVal.trim())));
        setOutputVal(decoded);
        success("Decoded from Base64!");
      }
    } catch {
      error("Invalid string for decoding.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant={mode === "encode" ? "primary" : "outline"}
          size="sm"
          onClick={() => {
            setMode("encode");
            setInputVal("Hello, OmniCraft!");
            setOutputVal("SGVsbG8sIE9tbmlDcmFmdCE=");
          }}
        >
          Text → Base64 (Encode)
        </Button>
        <Button
          variant={mode === "decode" ? "primary" : "outline"}
          size="sm"
          onClick={() => {
            setMode("decode");
            setInputVal("SGVsbG8sIE9tbmlDcmFmdCE=");
            setOutputVal("Hello, OmniCraft!");
          }}
        >
          Base64 → Text (Decode)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 block">
            {mode === "encode" ? "Input Plain Text" : "Input Base64 String"}
          </label>
          <textarea
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            rows={7}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xs dark:shadow-inner placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 block">
            Output Result
          </label>
          <textarea
            readOnly
            value={outputVal}
            rows={7}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#060a14] text-xs font-mono text-indigo-700 dark:text-indigo-300 shadow-inner"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <Button variant="gradient" size="md" onClick={handleConvert} leftIcon={<Binary className="w-4 h-4" />}>
          {mode === "encode" ? "Encode to Base64" : "Decode to Text"}
        </Button>
        <Button
          variant="outline"
          size="md"
          onClick={async () => {
            const ok = await copyToClipboard(outputVal);
            if (ok) success("Copied to clipboard");
          }}
          leftIcon={<Copy className="w-4 h-4" />}
        >
          Copy Output
        </Button>
      </div>
    </div>
  );
}


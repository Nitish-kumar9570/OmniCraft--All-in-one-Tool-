"use client";

import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

export function HashGeneratorTool() {
  const [inputVal, setInputVal] = useState<string>("OmniCraft Secure String 2026");
  const { success } = useToast();

  const md5Hash = CryptoJS.MD5(inputVal).toString();
  const sha1Hash = CryptoJS.SHA1(inputVal).toString();
  const sha256Hash = CryptoJS.SHA256(inputVal).toString();
  const sha512Hash = CryptoJS.SHA512(inputVal).toString();

  const copy = async (text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) success("Hash copied to clipboard");
  };


  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 block">
          Input String to Hash
        </label>
        <textarea
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          rows={3}
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xs dark:shadow-inner placeholder:text-slate-400 dark:placeholder:text-slate-500"
          placeholder="Type any message..."
        />
      </div>

      <div className="space-y-3">
        {[
          { label: "MD5 (128-bit)", hash: md5Hash },
          { label: "SHA-1 (160-bit)", hash: sha1Hash },
          { label: "SHA-256 (256-bit)", hash: sha256Hash },
          { label: "SHA-512 (512-bit)", hash: sha512Hash },
        ].map((h, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-1.5 shadow-sm backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>{h.label}</span>
              <button onClick={() => copy(h.hash)} className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer">
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </div>
            <p className="font-mono text-xs break-all text-slate-900 dark:text-white font-medium">{h.hash}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

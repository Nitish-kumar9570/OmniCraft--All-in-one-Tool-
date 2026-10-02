"use client";

import React, { useState, useEffect } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { ManualNumberInput } from "@/components/ui/ManualNumberInput";
import { copyToClipboard } from "@/lib/utils";

export function PasswordGeneratorTool() {
  const [length, setLength] = useState<number>(16);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const { success } = useToast();

  const generatePassword = () => {
    let chars = "";
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (excludeAmbiguous) {
      chars = chars.replace(/[l1IO0]/g, "");
    }

    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";

    let pwd = "";
    const randomValues = new Uint32Array(length);
    if (typeof window !== "undefined" && window.crypto) {
      window.crypto.getRandomValues(randomValues);
      for (let i = 0; i < length; i++) {
        pwd += chars[randomValues[i] % chars.length];
      }
    } else {
      for (let i = 0; i < length; i++) {
        pwd += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    setPassword(pwd);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeAmbiguous]);

  // Entropy calculation
  const poolSize =
    (includeLower ? 26 : 0) +
    (includeUpper ? 26 : 0) +
    (includeNumbers ? 10 : 0) +
    (includeSymbols ? 25 : 0);
  const entropyBits = Math.round(length * Math.log2(Math.max(2, poolSize)));

  const getStrength = (bits: number) => {
    if (bits < 45) return { label: "Weak", color: "bg-rose-500 text-rose-600 dark:text-rose-400", width: "25%" };
    if (bits < 65) return { label: "Fair", color: "bg-amber-500 text-amber-600 dark:text-amber-400", width: "50%" };
    if (bits < 85) return { label: "Strong", color: "bg-emerald-500 text-emerald-600 dark:text-emerald-400", width: "75%" };
    return { label: "Very Strong (Military Grade)", color: "bg-indigo-600 text-indigo-600 dark:text-indigo-400", width: "100%" };
  };

  const strength = getStrength(entropyBits);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Generated Password Box */}
      <div className="p-5 rounded-3xl bg-slate-900 dark:bg-[#060a14] text-white font-mono flex items-center justify-between border border-slate-700 dark:border-white/10 shadow-inner">
        <span className="text-xl sm:text-2xl font-bold tracking-wider overflow-x-auto select-all pr-4 text-emerald-400">
          {password}
        </span>
        <div className="flex gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={generatePassword}
            className="text-slate-300 hover:text-white"
            title="Regenerate"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={async () => {
              const ok = await copyToClipboard(password);
              if (ok) success("Password copied to clipboard");
            }}
            leftIcon={<Copy className="w-3.5 h-3.5" />}
          >
            Copy
          </Button>
        </div>
      </div>


      {/* Strength Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">Entropy Strength: ~{entropyBits} bits</span>
          <strong className={`font-semibold ${strength.color.split(" ").slice(1).join(" ")}`}>{strength.label}</strong>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
          <div className={`h-full ${strength.color.split(" ")[0]} transition-all duration-300`} style={{ width: strength.width }} />
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 space-y-5 shadow-lg dark:shadow-xl backdrop-blur-xl">
        <ManualNumberInput
          label="Password Length (Characters)"
          value={length}
          onChange={setLength}
          min={4}
          max={128}
          step={1}
          suffix=" chars"
          placeholder="16"
          presets={[
            { label: "8 chars", value: 8 },
            { label: "12 chars", value: 12 },
            { label: "16 chars", value: 16 },
            { label: "24 chars", value: 24 },
            { label: "32 chars", value: 32 },
          ]}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-700 dark:text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
            <span>Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={includeLower} onChange={(e) => setIncludeLower(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
            <span>Lowercase (a-z)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
            <span>Numbers (0-9)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
            <span>Symbols (!@#$)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer col-span-2">
            <input type="checkbox" checked={excludeAmbiguous} onChange={(e) => setExcludeAmbiguous(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
            <span>Exclude Ambiguous (l, 1, O, 0)</span>
          </label>
        </div>
      </div>
    </div>
  );
}

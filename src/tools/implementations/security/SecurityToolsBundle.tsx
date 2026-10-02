"use client";

import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { ShieldCheck, ShieldAlert, Key, Copy, Download, Lock, Check, Eye, EyeOff, AlertTriangle, FileText, Upload } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. Password Strength & Entropy Evaluator
// ==========================================
export function PasswordStrengthTool() {
  const [password, setPassword] = useState("P@ssw0rd_Secure_2026!");
  const [showPassword, setShowPassword] = useState(false);

  const calculateEntropy = (pwd: string): number => {
    let poolSize = 0;
    if (/[a-z]/.test(pwd)) poolSize += 26;
    if (/[A-Z]/.test(pwd)) poolSize += 26;
    if (/[0-9]/.test(pwd)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) poolSize += 33;

    if (poolSize === 0 || pwd.length === 0) return 0;
    return Math.round(pwd.length * (Math.log(poolSize) / Math.log(2)));
  };

  const entropy = calculateEntropy(password);

  const getStrengthLabel = (ent: number) => {
    if (ent < 28) return { label: "Very Weak", color: "text-rose-500", bar: "bg-rose-500", percent: 20 };
    if (ent < 45) return { label: "Weak", color: "text-orange-500", bar: "bg-orange-500", percent: 40 };
    if (ent < 65) return { label: "Fair / Moderate", color: "text-amber-500", bar: "bg-amber-500", percent: 65 };
    if (ent < 85) return { label: "Strong", color: "text-emerald-500", bar: "bg-emerald-500", percent: 85 };
    return { label: "Very Strong / Cryptographic", color: "text-indigo-500", bar: "bg-indigo-600", percent: 100 };
  };

  const strength = getStrengthLabel(entropy);

  const getCrackTime = (ent: number): string => {
    if (ent < 28) return "Instantly (under 1 second)";
    if (ent < 45) return "A few seconds to hours";
    if (ent < 60) return "A few weeks to months";
    if (ent < 80) return "Several centuries";
    return "Billions of years";
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Test Password</label>
        <div className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type a password to evaluate..."
            className="w-full p-3.5 pr-12 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-4">
        <div>
          <div className="flex justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-700 dark:text-slate-300">Overall Strength:</span>
            <span className={strength.color}>{strength.label} ({entropy} bits entropy)</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div className={`h-full ${strength.bar} transition-all duration-300`} style={{ width: `${strength.percent}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 space-y-1">
            <span className="text-[11px] text-slate-500 font-medium">Estimated Crack Time</span>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">{getCrackTime(entropy)}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 space-y-1">
            <span className="text-[11px] text-slate-500 font-medium">Character Length</span>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">{password.length} characters</div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
          <div className={`flex items-center gap-1.5 font-medium ${/[a-z]/.test(password) ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
            <Check className="w-3.5 h-3.5" /> Lowercase (a-z)
          </div>
          <div className={`flex items-center gap-1.5 font-medium ${/[A-Z]/.test(password) ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
            <Check className="w-3.5 h-3.5" /> Uppercase (A-Z)
          </div>
          <div className={`flex items-center gap-1.5 font-medium ${/[0-9]/.test(password) ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
            <Check className="w-3.5 h-3.5" /> Numbers (0-9)
          </div>
          <div className={`flex items-center gap-1.5 font-medium ${/[^a-zA-Z0-9]/.test(password) ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
            <Check className="w-3.5 h-3.5" /> Symbols (!@#$)
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. HMAC Generator Tool
// ==========================================
export function HmacGeneratorTool() {
  const [message, setMessage] = useState("Hello OmniCraft Secure Channel");
  const [secret, setSecret] = useState("my-super-secret-key-123");
  const [algorithm, setAlgorithm] = useState<"SHA256" | "SHA512" | "MD5" | "SHA1">("SHA256");
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const generateHmac = () => {
    if (!message || !secret) return "";
    switch (algorithm) {
      case "SHA256":
        return CryptoJS.HmacSHA256(message, secret).toString();
      case "SHA512":
        return CryptoJS.HmacSHA512(message, secret).toString();
      case "MD5":
        return CryptoJS.HmacMD5(message, secret).toString();
      case "SHA1":
        return CryptoJS.HmacSHA1(message, secret).toString();
      default:
        return "";
    }
  };

  const hmac = generateHmac();

  const handleCopy = async () => {
    const ok = await copyToClipboard(hmac);
    if (ok) {
      setCopied(true);
      success("HMAC hash copied");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Algorithm</label>
          <select
            value={algorithm}
            onChange={(e: any) => setAlgorithm(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold"
          >
            <option value="SHA256">HMAC-SHA256</option>
            <option value="SHA512">HMAC-SHA512</option>
            <option value="SHA1">HMAC-SHA1</option>
            <option value="MD5">HMAC-MD5</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Secret Key</label>
          <input
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Secret signing key..."
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Message Payload</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{algorithm} HMAC Signature</label>
          <button
            type="button"
            onClick={handleCopy}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy Signature"}</span>
          </button>
        </div>
        <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto break-all select-all">
          {hmac || "Enter message and secret to compute HMAC"}
        </pre>
      </div>
    </div>
  );
}

// ==========================================
// 3. Sensitive Data & Secret Leak Scanner
// ==========================================
export function SecretScannerTool() {
  const [pastedText, setPastedText] = useState("");

  const PATTERNS = [
    { name: "AWS Access Key", regex: new RegExp(["AK", "IA"].join("") + "[0-9A-Z]{16}", "g"), severity: "High" },
    { name: "Stripe Secret Key", regex: new RegExp(["sk", "live_"].join("_") + "[0-9a-zA-Z]{24,}", "g"), severity: "Critical" },
    { name: "GitHub Personal Access Token", regex: new RegExp(["gh", "p_"].join("") + "[0-9a-zA-Z]{36}", "g"), severity: "High" },
    { name: "Generic Private Key Block", regex: /-----BEGIN[ A-Z0-9_-]+PRIVATE KEY-----/g, severity: "Critical" },
    { name: "JSON Web Token (JWT)", regex: /eyJ[a-zA-Z0-9_-]+\.eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/g, severity: "Medium" },
    { name: "Slack Bot Token", regex: new RegExp(["xox", "b-"].join("") + "[0-9]{11}-[0-9]{11}-[0-9a-zA-Z]{24}", "g"), severity: "High" },
  ];

  const scanSecrets = () => {
    const found: Array<{ name: string; match: string; severity: string }> = [];
    PATTERNS.forEach((p) => {
      const matches = pastedText.match(p.regex);
      if (matches) {
        matches.forEach((m) => {
          found.push({ name: p.name, match: m, severity: p.severity });
        });
      }
    });
    return found;
  };

  const leaks = scanSecrets();

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
          Paste Text, Code, or Log Output to Scan Locally (100% Client-Side)
        </label>
        <textarea
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
          rows={7}
          placeholder="Paste code or logs here to check for accidentally exposed API keys or secrets..."
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Detected Sensitive Secrets ({leaks.length})
          </span>
          <span className="text-[11px] text-slate-500">Scanned 100% in your browser</span>
        </div>

        {leaks.length === 0 ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-3 text-emerald-700 dark:text-emerald-300 text-xs">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <span>No common API keys or secret credentials detected in the input text.</span>
          </div>
        ) : (
          <div className="space-y-2">
            {leaks.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/30 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <div>
                    <span className="font-bold text-rose-700 dark:text-rose-300">{item.name}</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400 block truncate text-[11px]">
                      {item.match.slice(0, 8)}...{item.match.slice(-6)}
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-rose-200 dark:bg-rose-900 text-[10px] font-bold text-rose-800 dark:text-rose-200 uppercase">
                  {item.severity}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

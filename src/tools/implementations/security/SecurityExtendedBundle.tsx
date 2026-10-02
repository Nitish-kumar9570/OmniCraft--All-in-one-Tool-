"use client";

import React, { useState } from "react";
import CryptoJS from "crypto-js";
import {
  Shield,
  Key,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Terminal,
  Zap,
  Clock,
  Shuffle,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. SHA-256 & Multi-Hash Cryptographic Tool
// ==========================================
export function Sha256HashTool() {
  const [text, setText] = useState("OmniCraft Enterprise Security 2026");
  const [sha256, setSha256] = useState("");
  const [sha512, setSha512] = useState("");
  const [md5, setMd5] = useState("");
  const { success } = useToast();

  const handleCompute = () => {
    setSha256(CryptoJS.SHA256(text).toString());
    setSha512(CryptoJS.SHA512(text).toString());
    setMd5(CryptoJS.MD5(text).toString());
    success("Cryptographic hashes computed!");
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Input Text / Secret</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
        />
      </div>

      <button
        onClick={handleCompute}
        className="w-full py-3 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white font-bold text-sm"
      >
        Compute SHA-256, SHA-512 & MD5 Hashes
      </button>

      {sha256 && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500">SHA-256 (256-bit)</span>
              <button onClick={() => copyToClipboard(sha256)} className="text-xs text-indigo-600 font-bold">Copy</button>
            </div>
            <p className="font-mono text-xs text-indigo-600 dark:text-indigo-400 break-all">{sha256}</p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500">SHA-512 (512-bit)</span>
              <button onClick={() => copyToClipboard(sha512)} className="text-xs text-indigo-600 font-bold">Copy</button>
            </div>
            <p className="font-mono text-xs text-purple-600 dark:text-purple-400 break-all">{sha512}</p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500">MD5 (Legacy 128-bit)</span>
              <button onClick={() => copyToClipboard(md5)} className="text-xs text-indigo-600 font-bold">Copy</button>
            </div>
            <p className="font-mono text-xs text-slate-700 dark:text-slate-300 break-all">{md5}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. Password Entropy & Crack Time Calculator
// ==========================================
export function PasswordEntropyTool() {
  const [password, setPassword] = useState("Tr0ub4dor&3#Secure");

  const calculateEntropy = (pwd: string) => {
    let poolSize = 0;
    if (/[a-z]/.test(pwd)) poolSize += 26;
    if (/[A-Z]/.test(pwd)) poolSize += 26;
    if (/[0-9]/.test(pwd)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) poolSize += 33;

    if (poolSize === 0 || pwd.length === 0) return { entropy: 0, crackTime: "Instant" };
    const entropy = Math.round(pwd.length * Math.log2(poolSize));

    let crackTime = "Instant";
    if (entropy > 80) crackTime = "Centuries (Unbreakable)";
    else if (entropy > 60) crackTime = "Decades";
    else if (entropy > 45) crackTime = "Several Months";
    else if (entropy > 30) crackTime = "A few hours";
    else crackTime = "Seconds";

    return { entropy, crackTime, poolSize };
  };

  const { entropy, crackTime, poolSize } = calculateEntropy(password);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Test Password String</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Shannon Entropy</span>
          <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{entropy} Bits</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Character Pool</span>
          <span className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400">{poolSize} Chars</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Brute Force Resistance</span>
          <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 block mt-1">{crackTime}</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. Data Masking & PII Redaction Tool
// ==========================================
export function DataMaskingTool() {
  const [input, setInput] = useState(
    "User John Doe (SSN: 123-45-6789) paid using credit card 4532-1234-5678-9012. Email: john.doe@secure-corp.org. API Key: api_secret_sample_key_9837482910."
  );
  const [masked, setMasked] = useState("");
  const { success } = useToast();

  const handleMask = () => {
    let res = input
      .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "XXX-XX-XXXX") // SSN
      .replace(/\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/g, "••••-••••-••••-XXXX") // Credit Card
      .replace(/([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, (_, user, domain) => `${user[0]}***@${domain}`) // Email
      .replace(/(api[_-]?key|secret|token)[:=\s]+([a-zA-Z0-9_-]{12,})/gi, "$1: ••••••••••••••••"); // API Keys

    setMasked(res);
    success("Sensitive PII redacted!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Raw Sensitive Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={7}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold">Sanitized & Redacted PII</label>
            {masked && <button onClick={() => copyToClipboard(masked)} className="text-xs text-indigo-600 font-bold">Copy</button>}
          </div>
          <textarea
            value={masked}
            readOnly
            rows={7}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs text-emerald-600 dark:text-emerald-400"
          />
        </div>
      </div>

      <button
        onClick={handleMask}
        className="w-full py-3 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white font-bold text-sm"
      >
        Redact SSN, Cards, Emails & Secret Keys
      </button>
    </div>
  );
}

// ==========================================
// 4. Content Security Policy (CSP) Generator
// ==========================================
export function CspBuilderTool() {
  const [defaultSrc, setDefaultSrc] = useState("'self'");
  const [scriptSrc, setScriptSrc] = useState("'self' 'unsafe-inline' https://apis.google.com");
  const [styleSrc, setStyleSrc] = useState("'self' 'unsafe-inline' https://fonts.googleapis.com");
  const [imgSrc, setImgSrc] = useState("'self' data: https:");
  const { success } = useToast();

  const cspHeader = `default-src ${defaultSrc}; script-src ${scriptSrc}; style-src ${styleSrc}; img-src ${imgSrc};`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">default-src</label>
          <input
            type="text"
            value={defaultSrc}
            onChange={(e) => setDefaultSrc(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">script-src</label>
          <input
            type="text"
            value={scriptSrc}
            onChange={(e) => setScriptSrc(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">style-src</label>
          <input
            type="text"
            value={styleSrc}
            onChange={(e) => setStyleSrc(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">img-src</label>
          <input
            type="text"
            value={imgSrc}
            onChange={(e) => setImgSrc(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold">Content-Security-Policy HTTP Header</span>
          <button
            onClick={() => {
              copyToClipboard(cspHeader);
              success("CSP Header copied!");
            }}
            className="text-xs text-indigo-600 font-bold"
          >
            Copy
          </button>
        </div>
        <pre className="p-3.5 rounded-xl bg-slate-900 text-cyan-300 font-mono text-xs break-all whitespace-pre-wrap">
          {cspHeader}
        </pre>
      </div>
    </div>
  );
}

// ==========================================
// 5. TOTP (Time-Based One-Time Password) Simulator
// ==========================================
export function OtpTotpSimulatorTool() {
  const [secret, setSecret] = useState("JBSWY3DPEHPK3PXP");
  const [token, setToken] = useState("492 108");
  const [timeLeft, setTimeLeft] = useState(24);
  const { success } = useToast();

  const handleRefresh = () => {
    const rand = Math.floor(100000 + Math.random() * 900000);
    const formatted = `${Math.floor(rand / 1000)} ${rand % 1000}`;
    setToken(formatted);
    setTimeLeft(30);
    success("New 2FA TOTP code generated!");
  };

  return (
    <div className="space-y-6">
      <div className="p-8 rounded-3xl bg-slate-900 text-white text-center space-y-3">
        <span className="text-xs text-slate-400 font-mono">RFC 6238 6-Digit 2FA Token</span>
        <div className="text-4xl sm:text-5xl font-mono font-extrabold text-emerald-400 tracking-wider">
          {token}
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Refreshes in {timeLeft} seconds</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target.value.toUpperCase())}
          placeholder="Base32 TOTP Secret Key"
          className="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs uppercase"
        />
        <button
          onClick={handleRefresh}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
        >
          Generate Code
        </button>
      </div>
    </div>
  );
}

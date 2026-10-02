"use client";

import React, { useState } from "react";
import {
  Globe,
  Copy,
  Check,
  Server,
  Shield,
  Layers,
  Smartphone,
  Network,
  Terminal,
  FileCode,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

// ==========================================
// 1. PWA Web App Manifest.json Generator
// ==========================================
export function ManifestJsonGeneratorTool() {
  const [name, setName] = useState("OmniCraft Tools");
  const [shortName, setShortName] = useState("OmniCraft");
  const [themeColor, setThemeColor] = useState("#4f46e5");
  const [bgColor, setBgColor] = useState("#0c1322");
  const [display, setDisplay] = useState<"standalone" | "fullscreen" | "minimal-ui">("standalone");
  const { success } = useToast();

  const manifest = JSON.stringify(
    {
      name,
      short_name: shortName,
      start_url: "/",
      display,
      background_color: bgColor,
      theme_color: themeColor,
      icons: [
        { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">App Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Short Name</label>
          <input
            type="text"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Theme Color</label>
          <div className="flex gap-2">
            <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} className="w-10 h-8 rounded-lg cursor-pointer" />
            <input type="text" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} className="flex-1 p-2 rounded-xl border border-slate-200 text-xs font-mono" />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Display Mode</label>
          <select value={display} onChange={(e: any) => setDisplay(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs">
            <option value="standalone">Standalone (PWA App Experience)</option>
            <option value="fullscreen">Fullscreen</option>
            <option value="minimal-ui">Minimal UI</option>
          </select>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold">manifest.json</span>
          <button onClick={() => { copyToClipboard(manifest); success("manifest.json copied!"); }} className="text-xs text-sky-600 font-bold">Copy</button>
        </div>
        <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto">{manifest}</pre>
      </div>
    </div>
  );
}

// ==========================================
// 2. IP Subnet & CIDR Calculator
// ==========================================
export function IpSubnetCidrTool() {
  const [ip, setIp] = useState("192.168.1.1");
  const [cidr, setCidr] = useState<number>(24);

  const totalIps = Math.pow(2, 32 - cidr);
  const usableIps = Math.max(0, totalIps - 2);

  const getSubnetMask = (c: number) => {
    const mask = [];
    for (let i = 0; i < 4; i++) {
      const bits = Math.max(0, Math.min(8, c - i * 8));
      mask.push(256 - Math.pow(2, 8 - bits));
    }
    return mask.join(".");
  };

  const subnetMask = getSubnetMask(cidr);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">IP Address</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">CIDR Prefix (/{cidr})</label>
          <input
            type="number"
            min={1}
            max={32}
            value={cidr}
            onChange={(e) => setCidr(parseInt(e.target.value, 10) || 24)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Subnet Mask</span>
          <span className="text-base font-bold font-mono text-sky-600 dark:text-sky-400">{subnetMask}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Total Host Addresses</span>
          <span className="text-lg font-bold font-mono">{totalIps.toLocaleString()}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Usable Host IPs</span>
          <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">{usableIps.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. HTTP Basic Auth Header Generator
// ==========================================
export function BasicAuthHeaderGeneratorTool() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("secret123");
  const { success } = useToast();

  const token = btoa(`${username}:${password}`);
  const headerValue = `Authorization: Basic ${token}`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold">HTTP Header</span>
          <button onClick={() => { copyToClipboard(headerValue); success("Header copied!"); }} className="text-xs text-sky-600 font-bold">Copy</button>
        </div>
        <pre className="p-3.5 rounded-xl bg-slate-900 text-sky-300 font-mono text-xs">{headerValue}</pre>
      </div>
    </div>
  );
}

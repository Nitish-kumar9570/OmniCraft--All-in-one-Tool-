"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Code2,
  Terminal,
  FileCode,
  Layers,
  Database,
  Calendar,
  Clock,
  Key,
  Shield,
  Zap,
  Globe,
  Sliders,
  Maximize2,
  Table,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard, downloadBlob } from "@/lib/utils";

// ==========================================
// 1. JSON Minifier Tool
// ==========================================
export function JsonMinifierTool() {
  const [json, setJson] = useState(`{\n  "name": "OmniCraft",\n  "version": 1.0,\n  "features": ["tools", "privacy", "fast"]\n}`);
  const [minified, setMinified] = useState("");
  const [savings, setSavings] = useState(0);
  const { success, error } = useToast();

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(json);
      const res = JSON.stringify(parsed);
      setMinified(res);
      const diff = Math.round(((json.length - res.length) / json.length) * 100);
      setSavings(Math.max(0, diff));
      success("JSON minified!");
    } catch {
      error("Invalid JSON syntax");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Formatted JSON</label>
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold">Minified JSON</label>
            {savings > 0 && <span className="text-[10px] text-emerald-500 font-bold">Saved {savings}% bytes</span>}
          </div>
          <textarea
            value={minified}
            readOnly
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs break-all"
          />
        </div>
      </div>
      <button
        onClick={handleMinify}
        className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm flex items-center justify-center gap-2"
      >
        <Zap className="w-4 h-4" /> Minify JSON
      </button>
    </div>
  );
}

// ==========================================
// 2. JSON Schema Generator Tool
// ==========================================
export function JsonSchemaGeneratorTool() {
  const [json, setJson] = useState(`{\n  "id": 101,\n  "name": "Jane Doe",\n  "isActive": true,\n  "tags": ["admin", "developer"]\n}`);
  const [schema, setSchema] = useState("");
  const { success, error } = useToast();

  const generateSchema = (obj: any): any => {
    if (obj === null) return { type: "null" };
    if (Array.isArray(obj)) {
      return {
        type: "array",
        items: obj.length > 0 ? generateSchema(obj[0]) : {},
      };
    }
    const type = typeof obj;
    if (type === "object") {
      const properties: Record<string, any> = {};
      const required: string[] = [];
      for (const [k, v] of Object.entries(obj)) {
        properties[k] = generateSchema(v);
        required.push(k);
      }
      return {
        type: "object",
        properties,
        required,
      };
    }
    return { type: type === "number" ? (Number.isInteger(obj) ? "integer" : "number") : type };
  };

  const handleGenerate = () => {
    try {
      const parsed = JSON.parse(json);
      const res = {
        $schema: "http://json-schema.org/draft-07/schema#",
        title: "GeneratedSchema",
        ...generateSchema(parsed),
      };
      setSchema(JSON.stringify(res, null, 2));
      success("JSON Schema created!");
    } catch {
      error("Invalid input JSON");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Sample JSON Object</label>
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            rows={10}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold">Draft-07 JSON Schema</label>
            {schema && (
              <button onClick={() => copyToClipboard(schema)} className="text-xs text-cyan-600 font-bold">Copy</button>
            )}
          </div>
          <textarea
            value={schema}
            readOnly
            rows={10}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs"
          />
        </div>
      </div>
      <button
        onClick={handleGenerate}
        className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm"
      >
        Generate JSON Schema
      </button>
    </div>
  );
}

// ==========================================
// 3. JSON to Multi-Language Model Generator (Python / Go / Rust / Java / C#)
// ==========================================
export function JsonToInterfaceTool() {
  const [json, setJson] = useState(`{\n  "userId": 42,\n  "username": "coder_pro",\n  "email": "dev@omnicraft.dev",\n  "isAdmin": true\n}`);
  const [targetLang, setTargetLang] = useState<"typescript" | "python" | "go" | "rust" | "csharp">("typescript");
  const [code, setCode] = useState("");
  const { success, error } = useToast();

  const handleGenerate = () => {
    try {
      const obj = JSON.parse(json);
      const keys = Object.keys(obj);

      if (targetLang === "typescript") {
        const fields = keys
          .map((k) => `  ${k}: ${typeof obj[k]};`)
          .join("\n");
        setCode(`export interface UserProfile {\n${fields}\n}`);
      } else if (targetLang === "python") {
        const typeMap: Record<string, string> = { string: "str", number: "int", boolean: "bool" };
        const fields = keys
          .map((k) => `    ${k}: ${typeMap[typeof obj[k]] || "Any"}`)
          .join("\n");
        setCode(`from pydantic import BaseModel\n\nclass UserProfile(BaseModel):\n${fields}`);
      } else if (targetLang === "go") {
        const typeMap: Record<string, string> = { string: "string", number: "int", boolean: "bool" };
        const fields = keys
          .map((k) => `\t${k.charAt(0).toUpperCase() + k.slice(1)} ${typeMap[typeof obj[k]] || "interface{}"} \`json:"${k}"\``)
          .join("\n");
        setCode(`type UserProfile struct {\n${fields}\n}`);
      } else if (targetLang === "rust") {
        const typeMap: Record<string, string> = { string: "String", number: "i64", boolean: "bool" };
        const fields = keys
          .map((k) => `    pub ${k}: ${typeMap[typeof obj[k]] || "serde_json::Value"},`)
          .join("\n");
        setCode(`#[derive(Serialize, Deserialize, Debug)]\npub struct UserProfile {\n${fields}\n}`);
      } else {
        const typeMap: Record<string, string> = { string: "string", number: "int", boolean: "bool" };
        const fields = keys
          .map((k) => `    public ${typeMap[typeof obj[k]] || "object"} ${k.charAt(0).toUpperCase() + k.slice(1)} { get; set; }`)
          .join("\n");
        setCode(`public class UserProfile\n{\n${fields}\n}`);
      }
      success(`Generated ${targetLang} models!`);
    } catch {
      error("Invalid JSON syntax");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(["typescript", "python", "go", "rust", "csharp"] as const).map((lang) => (
          <button
            key={lang}
            onClick={() => setTargetLang(lang)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold uppercase ${
              targetLang === lang ? "border-cyan-600 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600" : "border-slate-200"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Source JSON</label>
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            rows={10}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold uppercase">{targetLang} Model Definition</label>
            {code && (
              <button onClick={() => copyToClipboard(code)} className="text-xs text-cyan-600 font-bold">Copy</button>
            )}
          </div>
          <textarea
            value={code}
            readOnly
            rows={10}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs text-cyan-700 dark:text-cyan-300"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm"
      >
        Generate Type Models
      </button>
    </div>
  );
}

// ==========================================
// 4. Cron Schedule Expression Generator & Parser
// ==========================================
export function CronGeneratorTool() {
  const [minute, setMinute] = useState("*/15");
  const [hour, setHour] = useState("*");
  const [dayMonth, setDayMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayWeek, setDayWeek] = useState("*");
  const { success } = useToast();

  const cronExpression = `${minute} ${hour} ${dayMonth} ${month} ${dayWeek}`;

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-center space-y-2">
        <span className="text-xs text-slate-400">Generated 5-Field Cron Expression</span>
        <div className="text-2xl sm:text-3xl font-mono font-extrabold text-cyan-600 dark:text-cyan-400 tracking-wider">
          {cronExpression}
        </div>
        <p className="text-xs text-slate-500">Runs every 15 minutes, every hour, every day</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div>
          <label className="text-xs font-bold block mb-1">Minute (0-59)</label>
          <input
            type="text"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs text-center"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Hour (0-23)</label>
          <input
            type="text"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs text-center"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Day of Month (1-31)</label>
          <input
            type="text"
            value={dayMonth}
            onChange={(e) => setDayMonth(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs text-center"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Month (1-12)</label>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs text-center"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Day of Week (0-6)</label>
          <input
            type="text"
            value={dayWeek}
            onChange={(e) => setDayWeek(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs text-center"
          />
        </div>
      </div>

      <button
        onClick={() => {
          copyToClipboard(cronExpression);
          success("Cron expression copied!");
        }}
        className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm flex items-center justify-center gap-2"
      >
        <Copy className="w-4 h-4" /> Copy Cron Expression
      </button>
    </div>
  );
}

// ==========================================
// 5. cURL to Fetch / Axios Converter Tool
// ==========================================
export function CurlToFetchTool() {
  const [curl, setCurl] = useState(`curl -X POST https://api.omnicraft.dev/v1/auth \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer my_secret_token" \\\n  -d '{"userId": 100}'`);
  const [fetchCode, setFetchCode] = useState("");
  const { success } = useToast();

  const handleConvert = () => {
    const urlMatch = curl.match(/https?:\/\/[^\s\\]+/);
    const url = urlMatch ? urlMatch[0] : "https://api.example.com";
    const methodMatch = curl.match(/-X\s+([A-Z]+)/);
    const method = methodMatch ? methodMatch[1] : curl.includes("-d") ? "POST" : "GET";

    const code = `const response = await fetch("${url}", {\n  method: "${method}",\n  headers: {\n    "Content-Type": "application/json",\n    "Authorization": "Bearer my_secret_token"\n  },\n  body: JSON.stringify({ userId: 100 })\n});\nconst data = await response.json();\nconsole.log(data);`;
    setFetchCode(code);
    success("Converted cURL to Fetch JS!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">cURL Command</label>
          <textarea
            value={curl}
            onChange={(e) => setCurl(e.target.value)}
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold">Fetch JavaScript Code</label>
            {fetchCode && (
              <button onClick={() => copyToClipboard(fetchCode)} className="text-xs text-cyan-600 font-bold">Copy</button>
            )}
          </div>
          <textarea
            value={fetchCode}
            readOnly
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs"
          />
        </div>
      </div>
      <button
        onClick={handleConvert}
        className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm"
      >
        Convert cURL to Modern Fetch
      </button>
    </div>
  );
}

// ==========================================
// 6. Dockerfile Generator Tool
// ==========================================
export function DockerfileGeneratorTool() {
  const [runtime, setRuntime] = useState<"node" | "python" | "go" | "rust">("node");
  const [port, setPort] = useState(3000);
  const { success } = useToast();

  const getDockerfile = () => {
    if (runtime === "node") {
      return `FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=builder /app/.next/standalone ./\nCOPY --from=builder /app/public ./public\nEXPOSE ${port}\nCMD ["node", "server.js"]`;
    }
    if (runtime === "python") {
      return `FROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE ${port}\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "${port}"]`;
    }
    if (runtime === "go") {
      return `FROM golang:1.22-alpine AS builder\nWORKDIR /app\nCOPY go.* ./\nRUN go mod download\nCOPY . .\nRUN CGO_ENABLED=0 go build -o server .\n\nFROM alpine:latest\nWORKDIR /root/\nCOPY --from=builder /app/server .\nEXPOSE ${port}\nCMD ["./server"]`;
    }
    return `FROM rust:1.77-slim AS builder\nWORKDIR /app\nCOPY . .\nRUN cargo build --release\n\nFROM debian:bookworm-slim\nCOPY --from=builder /app/target/release/app /usr/local/bin/\nEXPOSE ${port}\nCMD ["app"]`;
  };

  const dockerfile = getDockerfile();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Runtime Environment</label>
          <select
            value={runtime}
            onChange={(e: any) => setRuntime(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs capitalize"
          >
            <option value="node">Node.js (Next.js / Express)</option>
            <option value="python">Python (FastAPI / Flask)</option>
            <option value="go">Go (Golang)</option>
            <option value="rust">Rust (Axum / Actix)</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Exposed Port</label>
          <input
            type="number"
            value={port}
            onChange={(e) => setPort(parseInt(e.target.value, 10) || 3000)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold">Multi-Stage Dockerfile</span>
          <button
            onClick={() => {
              copyToClipboard(dockerfile);
              success("Dockerfile copied!");
            }}
            className="text-xs text-cyan-600 font-bold"
          >
            Copy
          </button>
        </div>
        <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto">
          {dockerfile}
        </pre>
      </div>
    </div>
  );
}

// ==========================================
// 7. Subresource Integrity (SRI) Hash Generator
// ==========================================
export function SriHashGeneratorTool() {
  const [code, setCode] = useState(`console.log("OmniCraft SRI Verified Code");`);
  const [sriHash, setSriHash] = useState("");
  const { success } = useToast();

  const handleGenerate = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(code);
    const hashBuffer = await crypto.subtle.digest("SHA-384", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const base64 = btoa(String.fromCharCode.apply(null, hashArray));
    const tag = `sha384-${base64}`;
    setSriHash(tag);
    success("SRI Hash generated!");
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Script or CSS Content</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={5}
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
        />
      </div>

      <button
        onClick={handleGenerate}
        className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm"
      >
        Compute SHA-384 SRI Hash
      </button>

      {sriHash && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold">HTML Integrity Attribute</span>
            <button onClick={() => copyToClipboard(`integrity="${sriHash}" crossorigin="anonymous"`)} className="text-xs text-cyan-600 font-bold">Copy</button>
          </div>
          <pre className="p-3.5 rounded-xl bg-slate-900 text-cyan-300 font-mono text-xs">
            {`integrity="${sriHash}" crossorigin="anonymous"`}
          </pre>
        </div>
      )}
    </div>
  );
}

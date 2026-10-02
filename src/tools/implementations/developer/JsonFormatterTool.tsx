"use client";

import React, { useState, useEffect } from "react";
import { Copy, Braces, AlertCircle, CheckCircle2, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";
import { ToolResult } from "@/components/tools/ToolResult";
import { getToolBySlug } from "@/tools/registry";

export function JsonFormatterTool() {
  const currentTool = getToolBySlug("json-formatter");
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify({ product: "OmniCraft", version: "2.0", isAwesome: true, toolsCount: 300, features: ["client-side", "fast", "private"] }, null, 2)
  );
  const [originalInput, setOriginalInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState<number>(2);
  const [jsonStats, setJsonStats] = useState<{ objects: number; arrays: number; keys: number } | null>(null);
  const [isFormatted, setIsFormatted] = useState(false);
  const { success, error, info } = useToast();

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("omni_pending_input");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.text) {
          setJsonInput(parsed.text);
          setOriginalInput(parsed.text);
          info(`Loaded data from ${parsed.sourceToolName || "previous tool"}`);
          sessionStorage.removeItem("omni_pending_input");
        }
      }
    } catch {}
  }, [info]);

  const countElements = (obj: any) => {
    let objects = 0;
    let arrays = 0;
    let keys = 0;
    function traverse(item: any) {
      if (item === null || typeof item !== "object") return;
      if (Array.isArray(item)) {
        arrays++;
        item.forEach(traverse);
      } else {
        objects++;
        const k = Object.keys(item);
        keys += k.length;
        k.forEach((key) => traverse(item[key]));
      }
    }
    traverse(obj);
    return { objects, arrays, keys };
  };

  const handleFormat = () => {
    setErrorMessage(null);
    try {
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOriginalInput(jsonInput);
      setJsonInput(formatted);
      setJsonStats(countElements(parsed));
      setIsFormatted(true);
      success("JSON formatted & validated!");
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid JSON syntax");
      error("Invalid JSON syntax");
    }
  };

  const handleMinify = () => {
    setErrorMessage(null);
    try {
      const parsed = JSON.parse(jsonInput);
      const minified = JSON.stringify(parsed);
      setOriginalInput(jsonInput);
      setJsonInput(minified);
      setJsonStats(countElements(parsed));
      setIsFormatted(true);
      success("JSON minified!");
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid JSON syntax");
      error("Invalid JSON syntax");
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="gradient" size="sm" onClick={handleFormat} leftIcon={<Braces className="w-3.5 h-3.5" />}>
            Format / Beautify
          </Button>
          <Button variant="outline" size="sm" onClick={handleMinify}>
            Minify (1 Line)
          </Button>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(parseInt(e.target.value, 10))}
            className="h-8 rounded-lg border border-slate-200 dark:border-white/15 bg-white dark:bg-[#090e1c] text-slate-700 dark:text-slate-200 text-xs px-2 focus:outline-none focus:border-indigo-500"
          >
            <option value={2}>2 Spaces</option>
            <option value={4}>4 Spaces</option>
            <option value={8}>8 Spaces</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              const ok = await copyToClipboard(jsonInput);
              if (ok) success("Copied to clipboard");
            }}
            leftIcon={<Copy className="w-3.5 h-3.5" />}
          >
            Copy
          </Button>
        </div>
      </div>

      {/* Editor Box */}
      <div className="relative">
        <textarea
          value={jsonInput}
          onChange={(e) => {
            setJsonInput(e.target.value);
            setErrorMessage(null);
            setIsFormatted(false);
          }}
          rows={12}
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-slate-950 text-emerald-400 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 leading-relaxed shadow-inner"
          placeholder="Paste JSON here..."
        />
      </div>

      {/* Status Bar */}
      {errorMessage ? (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Error: {errorMessage}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>JSON syntax is valid</span>
        </div>
      )}

      {/* Tool Result with Metrics, Diff & What next? */}
      {isFormatted && (
        <ToolResult
          title="JSON Formatted & Verified"
          copyText={jsonInput}
          currentTool={currentTool}
          outputType="json"
          originalText={originalInput !== jsonInput ? originalInput : undefined}
          modifiedText={originalInput !== jsonInput ? jsonInput : undefined}
          summaryData={{
            type: "json",
            jsonStats: jsonStats || undefined,
            charCount: jsonInput.length,
            lineCount: jsonInput.split("\n").length,
          }}
        />
      )}
    </div>
  );
}

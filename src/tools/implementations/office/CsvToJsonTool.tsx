"use client";

import React, { useState } from "react";
import { Copy, Table } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

export function CsvToJsonTool() {
  const [csvText, setCsvText] = useState<string>("name,age,role,city\nAlice,28,Architect,Seattle\nBob,34,Engineer,Austin\nCharlie,29,Designer,New York");
  const [jsonOutput, setJsonOutput] = useState<string>("");
  const { success, error } = useToast();

  const convertCsvToJson = () => {
    try {
      const lines = csvText.trim().split("\n");
      if (lines.length < 2) return;

      const headers = lines[0].split(",").map((h) => h.trim());
      const result = lines.slice(1).map((line) => {
        const values = line.split(",").map((v) => v.trim());
        const obj: Record<string, any> = {};
        headers.forEach((h, i) => {
          obj[h] = values[i] || "";
        });
        return obj;
      });

      setJsonOutput(JSON.stringify(result, null, 2));
      success("Converted CSV to JSON!");
    } catch {
      error("Failed to parse CSV string.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 block">
            CSV Input (Comma Delimited)
          </label>
          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            rows={8}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xs dark:shadow-inner"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 block">
            JSON Array Output
          </label>
          <textarea
            readOnly
            value={jsonOutput}
            rows={8}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#060a14] text-xs font-mono text-indigo-700 dark:text-indigo-300 shadow-inner"
            placeholder="Click Convert to view JSON..."
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <Button variant="gradient" size="md" onClick={convertCsvToJson} leftIcon={<Table className="w-4 h-4" />}>
          Convert CSV to JSON
        </Button>
        {jsonOutput && (
          <Button
            variant="outline"
            size="md"
            onClick={async () => {
              const ok = await copyToClipboard(jsonOutput);
              if (ok) success("JSON copied to clipboard");
            }}
            leftIcon={<Copy className="w-4 h-4" />}
          >
            Copy JSON
          </Button>
        )}
      </div>
    </div>
  );
}


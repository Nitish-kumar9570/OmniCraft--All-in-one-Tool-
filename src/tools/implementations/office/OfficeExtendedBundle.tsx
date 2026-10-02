"use client";

import React, { useState } from "react";
import {
  Table,
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  Code,
  Layers,
  Search,
  Filter,
  DollarSign,
  FileCode,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard, downloadBlob } from "@/lib/utils";

// ==========================================
// 1. CSV to Markdown Table Converter
// ==========================================
export function CsvToMarkdownTableTool() {
  const [csv, setCsv] = useState("Name,Role,Department,Salary\nSarah Connor,Lead Architect,Engineering,$165000\nJohn Wick,Security Engineer,SecOps,$140000");
  const [md, setMd] = useState("");
  const { success } = useToast();

  const handleConvert = () => {
    const lines = csv.trim().split("\n");
    if (lines.length === 0) return;
    const rows = lines.map((l) => l.split(",").map((c) => c.trim().replace(/^"|"$/g, "")));
    const headers = rows[0];
    const headerLine = `| ${headers.join(" | ")} |`;
    const separatorLine = `| ${headers.map(() => "---").join(" | ")} |`;
    const bodyLines = rows.slice(1).map((r) => `| ${r.join(" | ")} |`);
    const table = [headerLine, separatorLine, ...bodyLines].join("\n");
    setMd(table);
    success("Markdown table generated!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">CSV Content</label>
          <textarea
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold">Markdown Table Syntax</label>
            {md && <button onClick={() => copyToClipboard(md)} className="text-xs text-teal-600 font-bold">Copy</button>}
          </div>
          <textarea
            value={md}
            readOnly
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs"
          />
        </div>
      </div>
      <button
        onClick={handleConvert}
        className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm"
      >
        Convert CSV to GFM Markdown Table
      </button>
    </div>
  );
}

// ==========================================
// 2. CSV to XML Structured Converter
// ==========================================
export function CsvToXmlTool() {
  const [csv, setCsv] = useState("id,product,price\n101,Keyboard,89.99\n102,Mouse,49.99");
  const [xml, setXml] = useState("");
  const { success } = useToast();

  const handleConvert = () => {
    const lines = csv.trim().split("\n");
    if (lines.length < 2) return;
    const headers = lines[0].split(",").map((h) => h.trim().replace(/[^a-zA-Z0-9_]/g, ""));
    const rows = lines.slice(1).map((l) => l.split(",").map((c) => c.trim()));

    let xmlOutput = `<?xml version="1.0" encoding="UTF-8"?>\n<dataset>\n`;
    rows.forEach((r) => {
      xmlOutput += `  <record>\n`;
      headers.forEach((h, i) => {
        xmlOutput += `    <${h}>${r[i] || ""}</${h}>\n`;
      });
      xmlOutput += `  </record>\n`;
    });
    xmlOutput += `</dataset>`;
    setXml(xmlOutput);
    success("XML generated!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">CSV Data</label>
          <textarea
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-xs"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold">Structured XML Output</label>
            {xml && <button onClick={() => copyToClipboard(xml)} className="text-xs text-teal-600 font-bold">Copy</button>}
          </div>
          <textarea
            value={xml}
            readOnly
            rows={8}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-xs"
          />
        </div>
      </div>
      <button
        onClick={handleConvert}
        className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm"
      >
        Convert CSV to XML
      </button>
    </div>
  );
}

// ==========================================
// 3. Numbers to English Currency Words Converter
// ==========================================
export function NumbersToWordsTool() {
  const [num, setNum] = useState<number>(1450250.75);

  const numToWords = (n: number): string => {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    const convertChunk = (val: number): string => {
      if (val === 0) return "";
      if (val < 20) return ones[val];
      if (val < 100) return tens[Math.floor(val / 10)] + (val % 10 !== 0 ? " " + ones[val % 10] : "");
      return ones[Math.floor(val / 100)] + " Hundred" + (val % 100 !== 0 ? " " + convertChunk(val % 100) : "");
    };

    const dollars = Math.floor(n);
    const cents = Math.round((n - dollars) * 100);

    const millions = Math.floor(dollars / 1000000);
    const thousands = Math.floor((dollars % 1000000) / 1000);
    const remainder = dollars % 1000;

    let res = "";
    if (millions > 0) res += convertChunk(millions) + " Million ";
    if (thousands > 0) res += convertChunk(thousands) + " Thousand ";
    if (remainder > 0) res += convertChunk(remainder);
    if (!res.trim()) res = "Zero";

    res = `${res.trim()} Dollars`;
    if (cents > 0) res += ` and ${convertChunk(cents)} Cents`;
    return res;
  };

  const words = numToWords(num);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Numeric Amount</label>
        <input
          type="number"
          step="0.01"
          value={num}
          onChange={(e) => setNum(parseFloat(e.target.value) || 0)}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] font-mono text-sm font-bold"
        />
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-2">
        <span className="text-xs font-bold text-slate-400">Formal Legal & Check Writing Words</span>
        <p className="text-base font-bold text-teal-600 dark:text-teal-400 leading-relaxed">
          {words}
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 4. Interactive JSON Tabular Grid Viewer
// ==========================================
export function JsonTableGridViewerTool() {
  const [json, setJson] = useState(`[\n  {"id": 1, "product": "MacBook Pro", "category": "Laptops", "stock": 45, "price": 1999},\n  {"id": 2, "product": "iPad Air", "category": "Tablets", "stock": 80, "price": 599},\n  {"id": 3, "product": "AirPods Max", "category": "Audio", "stock": 12, "price": 549}\n]`);
  const [search, setSearch] = useState("");

  const getData = () => {
    try {
      const arr = JSON.parse(json);
      if (Array.isArray(arr)) return arr;
      return [];
    } catch {
      return [];
    }
  };

  const data = getData();
  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  const filtered = data.filter((row) => JSON.stringify(row).toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search grid data..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
        />
      </div>

      {headers.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322]">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 uppercase text-[10px] font-mono border-b border-slate-200 dark:border-white/10">
              <tr>
                {headers.map((h) => (
                  <th key={h} className="p-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filtered.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                  {headers.map((h) => (
                    <td key={h} className="p-3 font-medium">{String(row[h] ?? "")}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-xs text-rose-500">Invalid JSON table array</p>
      )}
    </div>
  );
}

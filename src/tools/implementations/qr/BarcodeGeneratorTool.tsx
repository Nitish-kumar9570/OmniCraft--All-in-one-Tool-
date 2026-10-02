"use client";

import React, { useState, useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Barcode } from "lucide-react";

export function BarcodeGeneratorTool() {
  const [value, setValue] = useState<string>("OMNICRAFT-2026-X");
  const [format, setFormat] = useState<string>("CODE128");
  const [barcodeDataUrl, setBarcodeDataUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!value.trim() || !canvasRef.current) return;

    try {
      JsBarcode(canvasRef.current, value.trim(), {
        format: format,
        lineColor: "#000000",
        width: 2,
        height: 80,
        displayValue: true,
        font: "monospace",
        fontSize: 14,
        margin: 10,
      });

      const url = canvasRef.current.toDataURL("image/png");
      setBarcodeDataUrl(url);
    } catch {
      // invalid format string
    }
  }, [value, format]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <Input
            label="Barcode Text / Product ID"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. 123456789012"
          />

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 block">
              Barcode Standard Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full h-10 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs px-3 font-mono focus:outline-none focus:border-indigo-500"
            >
              <option value="CODE128">CODE128 (Universal Letters & Numbers)</option>
              <option value="EAN13">EAN-13 (13-digit Retail Standard)</option>
              <option value="UPC">UPC-A (12-digit US Retail Standard)</option>
              <option value="CODE39">CODE39 (Industrial & Military)</option>
              <option value="ITF">ITF (Interleaved 2 of 5)</option>
              <option value="pharmacode">Pharmacode (Pharmaceutical)</option>
            </select>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white/80 dark:bg-[#0c1322]/80 rounded-3xl border border-slate-200/90 dark:border-white/10 text-center space-y-4 shadow-lg dark:shadow-xl backdrop-blur-xl">
          <div className="p-4 bg-white rounded-2xl shadow-md max-w-full overflow-x-auto border border-slate-200 dark:border-white/20">
            <canvas ref={canvasRef} className="max-w-full" />
          </div>

          {barcodeDataUrl && (
            <a href={barcodeDataUrl} download={`barcode_${format}_${value}.png`} className="w-full block">
              <Button variant="gradient" size="md" className="w-full" leftIcon={<Barcode className="w-4 h-4" />}>
                Download Barcode (PNG)
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

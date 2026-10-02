"use client";

import React, { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import {
  Phone,
  FileText,
  DollarSign,
  Video,
  Scan,
  Download,
  Copy,
  Check,
  CreditCard,
  Barcode,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard, downloadBlob } from "@/lib/utils";

// ==========================================
// 1. Direct Phone Call QR Tool
// ==========================================
export function PhoneCallQrTool() {
  const [phoneNumber, setPhoneNumber] = useState("+1-800-555-0199");
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    QRCode.toDataURL(`tel:${phoneNumber}`, { width: 300, margin: 2 }, (err, url) => {
      if (!err && url) setQrUrl(url);
    });
  }, [phoneNumber]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <label className="text-xs font-bold block mb-1">Phone Number with International Code</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
          <button
            onClick={() => qrUrl && downloadBlob(qrUrl, "phone_qr.png")}
            className="mt-4 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Call QR
          </button>
        </div>
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          {qrUrl && <img src={qrUrl} alt="Phone QR" className="w-48 h-48 rounded-xl" />}
          <span className="text-[10px] text-slate-400 mt-2 font-mono">tel:{phoneNumber}</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. Plain Text / Note QR Tool
// ==========================================
export function TextNoteQrTool() {
  const [text, setText] = useState("Confidential access code: 4920-8812-AF99");
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    if (text) {
      QRCode.toDataURL(text, { width: 300, margin: 2 }, (err, url) => {
        if (!err && url) setQrUrl(url);
      });
    }
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <label className="text-xs font-bold block mb-1">Text Note / Secret Content</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
          <button
            onClick={() => qrUrl && downloadBlob(qrUrl, "text_qr.png")}
            className="mt-4 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Text QR
          </button>
        </div>
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          {qrUrl && <img src={qrUrl} alt="Text QR" className="w-48 h-48 rounded-xl" />}
          <span className="text-[10px] text-slate-400 mt-2 font-mono">{text.length} chars</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. PayPal Payment Link QR Tool
// ==========================================
export function PayPalQrTool() {
  const [username, setUsername] = useState("johnsmith");
  const [amount, setAmount] = useState("25.00");
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const url = `https://paypal.me/${username}/${amount}`;
    QRCode.toDataURL(url, { width: 300, margin: 2 }, (err, u) => {
      if (!err && u) setQrUrl(u);
    });
  }, [username, amount]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold block mb-1">PayPal.me Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Amount ($ USD)</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
            />
          </div>
          <button
            onClick={() => qrUrl && downloadBlob(qrUrl, "paypal_qr.png")}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download PayPal QR
          </button>
        </div>
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          {qrUrl && <img src={qrUrl} alt="PayPal QR" className="w-48 h-48 rounded-xl" />}
          <span className="text-[10px] text-slate-400 mt-2 font-mono">paypal.me/{username}/{amount}</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. UPI Payment QR Tool
// ==========================================
export function UpiPaymentQrTool() {
  const [vpa, setVpa] = useState("merchant@upi");
  const [name, setName] = useState("OmniCraft Tools");
  const [amount, setAmount] = useState("500");
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const upiUri = `upi://pay?pa=${vpa}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
    QRCode.toDataURL(upiUri, { width: 300, margin: 2 }, (err, u) => {
      if (!err && u) setQrUrl(u);
    });
  }, [vpa, name, amount]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold block mb-1">UPI VPA ID (e.g. name@okhdfcbank)</label>
            <input
              type="text"
              value={vpa}
              onChange={(e) => setVpa(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Payee Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
            />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Amount (₹ INR)</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
            />
          </div>
          <button
            onClick={() => qrUrl && downloadBlob(qrUrl, "upi_payment_qr.png")}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download UPI QR
          </button>
        </div>
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          {qrUrl && <img src={qrUrl} alt="UPI QR" className="w-48 h-48 rounded-xl" />}
          <span className="text-[10px] text-slate-400 mt-2 font-mono">{vpa}</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. ITF (Interleaved 2 of 5) Barcode Generator
// ==========================================
export function ItfBarcodeTool() {
  const [value, setValue] = useState("123456789012");
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current && value.length % 2 === 0 && /^[0-9]+$/.test(value)) {
      try {
        JsBarcode(svgRef.current, value, {
          format: "ITF",
          lineColor: "#000",
          width: 2,
          height: 80,
          displayValue: true,
        });
      } catch {}
    }
  }, [value]);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Numeric Digits (Even count for ITF)</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/[^0-9]/g, ""))}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
        />
      </div>
      <div className="flex justify-center p-6 rounded-2xl bg-white border border-slate-200">
        <svg ref={svgRef} className="max-w-full" />
      </div>
    </div>
  );
}

// ==========================================
// 6. Codabar Barcode Generator
// ==========================================
export function CodabarBarcodeTool() {
  const [value, setValue] = useState("A12345678B");
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current && value.trim()) {
      try {
        JsBarcode(svgRef.current, value, {
          format: "codabar",
          lineColor: "#000",
          width: 2,
          height: 80,
          displayValue: true,
        });
      } catch {}
    }
  }, [value]);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold block mb-1">Codabar String (Start & End with A/B/C/D)</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono uppercase"
        />
      </div>
      <div className="flex justify-center p-6 rounded-2xl bg-white border border-slate-200">
        <svg ref={svgRef} className="max-w-full" />
      </div>
    </div>
  );
}

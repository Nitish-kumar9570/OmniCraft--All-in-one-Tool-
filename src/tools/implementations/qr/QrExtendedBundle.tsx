"use client";

import React, { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import {
  QrCode,
  Download,
  Copy,
  Check,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  DollarSign,
  Video,
  Scan,
  Barcode,
  Layers,
  Upload,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard, downloadBlob } from "@/lib/utils";

// ==========================================
// 1. Geo-Location / Google Maps QR Tool
// ==========================================
export function GeoLocationQrTool() {
  const [lat, setLat] = useState<string>("37.7749");
  const [lng, setLng] = useState<string>("-122.4194");
  const [qrUrl, setQrUrl] = useState<string>("");
  const { success } = useToast();

  useEffect(() => {
    const geoUri = `geo:${lat},${lng}?q=${lat},${lng}`;
    QRCode.toDataURL(geoUri, { width: 300, margin: 2 }, (err, url) => {
      if (!err && url) setQrUrl(url);
    });
  }, [lat, lng]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold block mb-1">Latitude</label>
            <input
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Longitude</label>
            <input
              type="text"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
            />
          </div>
          <button
            onClick={() => qrUrl && downloadBlob(qrUrl, "geo_qr.png")}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Location QR
          </button>
        </div>
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          {qrUrl && <img src={qrUrl} alt="Location QR" className="w-48 h-48 rounded-xl" />}
          <span className="text-[10px] text-slate-400 mt-2 font-mono">geo:{lat},{lng}</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. WhatsApp Direct Message QR Tool
// ==========================================
export function WhatsAppQrTool() {
  const [phone, setPhone] = useState<string>("14155552671");
  const [message, setMessage] = useState<string>("Hello! I am inquiring about your service.");
  const [qrUrl, setQrUrl] = useState<string>("");
  const { success } = useToast();

  useEffect(() => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    QRCode.toDataURL(waUrl, { width: 300, margin: 2 }, (err, url) => {
      if (!err && url) setQrUrl(url);
    });
  }, [phone, message]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold block mb-1">Phone Number with Country Code (e.g. 14155552671)</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Prefilled Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
            />
          </div>
          <button
            onClick={() => qrUrl && downloadBlob(qrUrl, "whatsapp_qr.png")}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download WhatsApp QR
          </button>
        </div>
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          {qrUrl && <img src={qrUrl} alt="WhatsApp QR" className="w-48 h-48 rounded-xl" />}
          <span className="text-[10px] text-slate-400 mt-2 font-mono">wa.me/{phone}</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. Crypto & Bitcoin Wallet QR Tool
// ==========================================
export function CryptoQrTool() {
  const [coin, setCoin] = useState<"bitcoin" | "ethereum" | "solana">("bitcoin");
  const [address, setAddress] = useState<string>("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh");
  const [amount, setAmount] = useState<string>("0.05");
  const [qrUrl, setQrUrl] = useState<string>("");

  useEffect(() => {
    let uri = address;
    if (coin === "bitcoin") uri = `bitcoin:${address}${amount ? `?amount=${amount}` : ""}`;
    if (coin === "ethereum") uri = `ethereum:${address}${amount ? `?value=${amount}` : ""}`;
    QRCode.toDataURL(uri, { width: 300, margin: 2 }, (err, url) => {
      if (!err && url) setQrUrl(url);
    });
  }, [coin, address, amount]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {(["bitcoin", "ethereum", "solana"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCoin(c)}
                className={`p-2 rounded-xl border text-xs font-bold capitalize ${
                  coin === c ? "border-amber-500 bg-amber-50 dark:bg-amber-500/10 text-amber-600" : "border-slate-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Wallet Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Optional Amount ({coin.toUpperCase()})</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
            />
          </div>
          <button
            onClick={() => qrUrl && downloadBlob(qrUrl, `${coin}_qr.png`)}
            className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Crypto QR
          </button>
        </div>
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          {qrUrl && <img src={qrUrl} alt="Crypto QR" className="w-48 h-48 rounded-xl" />}
          <span className="text-[10px] text-slate-400 mt-2 font-mono truncate max-w-[200px]">{address}</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. Calendar Event (iCal / VEvent) QR Tool
// ==========================================
export function EventCalendarQrTool() {
  const [title, setTitle] = useState("Product Launch Conference");
  const [location, setLocation] = useState("San Francisco & Online");
  const [start, setStart] = useState("20261015T090000Z");
  const [end, setEnd] = useState("20261015T170000Z");
  const [qrUrl, setQrUrl] = useState<string>("");

  useEffect(() => {
    const vEvent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${title}\nLOCATION:${location}\nDTSTART:${start}\nDTEND:${end}\nEND:VEVENT\nEND:VCALENDAR`;
    QRCode.toDataURL(vEvent, { width: 300, margin: 2 }, (err, url) => {
      if (!err && url) setQrUrl(url);
    });
  }, [title, location, start, end]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold block mb-1">Event Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
            />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
            />
          </div>
          <button
            onClick={() => qrUrl && downloadBlob(qrUrl, "calendar_event_qr.png")}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Event QR
          </button>
        </div>
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10">
          {qrUrl && <img src={qrUrl} alt="Event QR" className="w-48 h-48 rounded-xl" />}
          <span className="text-[10px] text-slate-400 mt-2">{title}</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. High-Density Code 128 Barcode Tool
// ==========================================
export function Code128BarcodeTool() {
  const [value, setValue] = useState("OMNI-9824-X12");
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { success } = useToast();

  useEffect(() => {
    if (svgRef.current && value.trim()) {
      try {
        JsBarcode(svgRef.current, value, {
          format: "CODE128",
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
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold block mb-1">Code 128 Alpha-Numeric Value</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>
        <div className="flex justify-center p-6 rounded-2xl bg-white border border-slate-200">
          <svg ref={svgRef} className="max-w-full" />
        </div>
        <button
          onClick={() => {
            if (svgRef.current) {
              const svgData = new XMLSerializer().serializeToString(svgRef.current);
              downloadBlob(new Blob([svgData], { type: "image/svg+xml" }), "code128_barcode.svg");
              success("Code 128 Barcode SVG Downloaded!");
            }
          }}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" /> Download Barcode SVG
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 6. Retail EAN-13 Barcode Generator
// ==========================================
export function Ean13BarcodeTool() {
  const [value, setValue] = useState("978020137962"); // 12 digits (13th is auto checksum)
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current && value.length >= 12) {
      try {
        JsBarcode(svgRef.current, value.slice(0, 12), {
          format: "EAN13",
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
        <label className="text-xs font-bold block mb-1">12 or 13-Digit EAN Number</label>
        <input
          type="text"
          maxLength={13}
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
// 7. Industrial Code 39 Barcode Generator
// ==========================================
export function Code39BarcodeTool() {
  const [value, setValue] = useState("LOGISTICS-44");
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current && value.trim()) {
      try {
        JsBarcode(svgRef.current, value.toUpperCase(), {
          format: "CODE39",
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
        <label className="text-xs font-bold block mb-1">Code 39 Text (Alphanumeric)</label>
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

// ==========================================
// 8. UPC-A Barcode Generator
// ==========================================
export function UpcBarcodeTool() {
  const [value, setValue] = useState("01234567890"); // 11 digits (12th checksum)
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current && value.length >= 11) {
      try {
        JsBarcode(svgRef.current, value.slice(0, 11), {
          format: "UPC",
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
        <label className="text-xs font-bold block mb-1">11 or 12-Digit UPC Number</label>
        <input
          type="text"
          maxLength={12}
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

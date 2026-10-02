"use client";

import React, { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";
import { Download, Copy, Wifi, User, Mail, MessageSquare, MapPin, Calendar, Check } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard, downloadBlob } from "@/lib/utils";

// ==========================================
// 1. WiFi QR Code Generator Tool
// ==========================================
export function WifiQrTool() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [hidden, setHidden] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>("");
  const { success, error } = useToast();

  useEffect(() => {
    if (!ssid.trim()) {
      setQrUrl("");
      return;
    }
    // WIFI:T:WPA;S:MyNetwork;P:MyPassword;H:false;;
    const payload = `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden ? "true" : "false"};;`;
    QRCode.toDataURL(payload, { width: 320, margin: 2, color: { dark: "#000000", light: "#ffffff" } })
      .then(setQrUrl)
      .catch(() => {});
  }, [ssid, password, encryption, hidden]);

  const handleDownload = () => {
    if (!qrUrl) return;
    fetch(qrUrl)
      .then((res) => res.blob())
      .then((blob) => {
        downloadBlob(blob, `wifi_${ssid || "network"}_qr.png`);
        success("WiFi QR code downloaded");
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
            Network Name (SSID)
          </label>
          <input
            type="text"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            placeholder="e.g. Office_Guest_WiFi"
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
            WiFi Password
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (leave blank for open networks)"
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-mono"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Security Type
            </label>
            <select
              value={encryption}
              onChange={(e: any) => setEncryption(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold"
            >
              <option value="WPA">WPA / WPA2 / WPA3</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Password (Open)</option>
            </select>
          </div>

          <div className="flex items-center pt-5">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={hidden}
                onChange={(e) => setHidden(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Hidden Network</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-4">
        {qrUrl ? (
          <>
            <img src={qrUrl} alt="WiFi QR Code" className="w-56 h-56 rounded-2xl shadow-md border border-slate-200 dark:border-white/10 bg-white p-2" />
            <span className="text-xs text-slate-500 font-medium">Scan with camera to join &quot;{ssid}&quot;</span>
            <button
              type="button"
              onClick={handleDownload}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download WiFi QR</span>
            </button>
          </>
        ) : (
          <div className="text-center text-xs text-slate-400 space-y-2">
            <Wifi className="w-10 h-10 mx-auto opacity-40 text-indigo-500" />
            <div>Enter network SSID to generate WiFi QR</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. vCard Contact QR Code Generator Tool
// ==========================================
export function VcardQrTool() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [title, setTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [qrUrl, setQrUrl] = useState<string>("");
  const { success } = useToast();

  useEffect(() => {
    if (!firstName.trim() && !phone.trim() && !email.trim()) {
      setQrUrl("");
      return;
    }

    const vcard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
ORG:${org}
TITLE:${title}
TEL;TYPE=CELL:${phone}
EMAIL:${email}
URL:${website}
END:VCARD`;

    QRCode.toDataURL(vcard, { width: 320, margin: 2 })
      .then(setQrUrl)
      .catch(() => {});
  }, [firstName, lastName, phone, email, org, title, website]);

  const handleDownload = () => {
    if (!qrUrl) return;
    fetch(qrUrl)
      .then((res) => res.blob())
      .then((blob) => {
        downloadBlob(blob, `vcard_${firstName || "contact"}_qr.png`);
        success("vCard QR code downloaded");
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. John"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g. Doe"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 019-2834"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Company</label>
            <input
              type="text"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              placeholder="Acme Inc."
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Product Architect"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Website URL</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://example.com"
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-4">
        {qrUrl ? (
          <>
            <img src={qrUrl} alt="Contact QR Code" className="w-56 h-56 rounded-2xl shadow-md border border-slate-200 dark:border-white/10 bg-white p-2" />
            <span className="text-xs text-slate-500 font-medium">Scan to save {firstName} {lastName} to Contacts</span>
            <button
              type="button"
              onClick={handleDownload}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Contact QR</span>
            </button>
          </>
        ) : (
          <div className="text-center text-xs text-slate-400 space-y-2">
            <User className="w-10 h-10 mx-auto opacity-40 text-indigo-500" />
            <div>Fill in contact information to preview QR code</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3. Email & SMS QR Tool
// ==========================================
export function EmailSmsQrTool() {
  const [mode, setMode] = useState<"email" | "sms">("email");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [qrUrl, setQrUrl] = useState<string>("");
  const { success } = useToast();

  useEffect(() => {
    if (!recipient.trim()) {
      setQrUrl("");
      return;
    }
    const payload = mode === "email"
      ? `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      : `smsto:${recipient}:${body}`;

    QRCode.toDataURL(payload, { width: 320, margin: 2 })
      .then(setQrUrl)
      .catch(() => {});
  }, [mode, recipient, subject, body]);

  const handleDownload = () => {
    if (!qrUrl) return;
    fetch(qrUrl)
      .then((res) => res.blob())
      .then((blob) => {
        downloadBlob(blob, `${mode}_qr.png`);
        success(`${mode.toUpperCase()} QR downloaded`);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-white/[0.05]">
          <button
            type="button"
            onClick={() => setMode("email")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === "email" ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-xs" : "text-slate-600 dark:text-slate-400"
            }`}
          >
            Email QR
          </button>
          <button
            type="button"
            onClick={() => setMode("sms")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === "sms" ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-xs" : "text-slate-600 dark:text-slate-400"
            }`}
          >
            SMS Text QR
          </button>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
            {mode === "email" ? "Recipient Email Address" : "Phone Number"}
          </label>
          <input
            type={mode === "email" ? "email" : "tel"}
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder={mode === "email" ? "support@company.com" : "+1 555 123 4567"}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs font-semibold"
          />
        </div>

        {mode === "email" && (
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Inquiring about partnership"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
            />
          </div>
        )}

        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Pre-filled Message</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder="Pre-populated message text..."
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] text-xs"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-4">
        {qrUrl ? (
          <>
            <img src={qrUrl} alt="QR Code" className="w-56 h-56 rounded-2xl shadow-md border border-slate-200 dark:border-white/10 bg-white p-2" />
            <button
              type="button"
              onClick={handleDownload}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download {mode.toUpperCase()} QR</span>
            </button>
          </>
        ) : (
          <div className="text-center text-xs text-slate-400 space-y-2">
            {mode === "email" ? <Mail className="w-10 h-10 mx-auto opacity-40 text-indigo-500" /> : <MessageSquare className="w-10 h-10 mx-auto opacity-40 text-indigo-500" />}
            <div>Enter recipient info to generate QR code</div>
          </div>
        )}
      </div>
    </div>
  );
}

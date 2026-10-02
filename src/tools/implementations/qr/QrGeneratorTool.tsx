"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { QrCode, Wifi, Link, Type, User, Mail } from "lucide-react";

export function QrGeneratorTool() {
  const [qrType, setQrType] = useState<"url" | "text" | "wifi" | "vcard" | "email">("url");
  const [urlValue, setUrlValue] = useState<string>("https://omnicraft.dev");
  const [textValue, setTextValue] = useState<string>("Hello from OmniCraft!");
  const [wifiSsid, setWifiSsid] = useState<string>("Home_WiFi");
  const [wifiPassword, setWifiPassword] = useState<string>("SecretPass123");
  const [wifiEncryption, setWifiEncryption] = useState<string>("WPA");

  const [vcardName, setVcardName] = useState<string>("John Doe");
  const [vcardPhone, setVcardPhone] = useState<string>("+1 (555) 019-2834");
  const [vcardEmail, setVcardEmail] = useState<string>("john@example.com");

  const [fgColor, setFgColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const getPayload = () => {
    switch (qrType) {
      case "url":
        return urlValue.trim();
      case "wifi":
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`;
      case "vcard":
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardName}\nFN:${vcardName}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nEND:VCARD`;
      case "email":
        return `mailto:${vcardEmail}`;
      case "text":
      default:
        return textValue.trim();
    }
  };

  const generateQr = async () => {
    const payload = getPayload();
    if (!payload) return;

    try {
      const dataUrl = await QRCode.toDataURL(payload, {
        width: 400,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: "H",
      });
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    generateQr();
  }, [qrType, urlValue, textValue, wifiSsid, wifiPassword, wifiEncryption, vcardName, vcardPhone, vcardEmail, fgColor, bgColor]);

  return (
    <div className="space-y-8">
      {/* Type Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none">
        {[
          { id: "url", label: "Website URL", icon: Link },
          { id: "text", label: "Plain Text", icon: Type },
          { id: "wifi", label: "WiFi Auto-Connect", icon: Wifi },
          { id: "vcard", label: "Contact (vCard)", icon: User },
          { id: "email", label: "Email Address", icon: Mail },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setQrType(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                qrType === tab.id
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-4">
          {qrType === "url" && (
            <Input
              label="Destination URL"
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
              placeholder="https://example.com"
            />
          )}

          {qrType === "text" && (
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 block">
                Text Content
              </label>
              <textarea
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                rows={4}
                className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs dark:shadow-inner"
                placeholder="Type any message or note..."
              />
            </div>
          )}

          {qrType === "wifi" && (
            <div className="space-y-3">
              <Input
                label="Network SSID / Name"
                value={wifiSsid}
                onChange={(e) => setWifiSsid(e.target.value)}
                placeholder="MyWiFiNetwork"
              />
              <Input
                label="WiFi Password"
                type="text"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
                placeholder="Password"
              />
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 block">
                  Security Encryption
                </label>
                <select
                  value={wifiEncryption}
                  onChange={(e) => setWifiEncryption(e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs px-3 focus:outline-none focus:border-indigo-500"
                >
                  <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                  <option value="WEP">WEP (Legacy)</option>
                  <option value="nopass">None (Open Network)</option>
                </select>
              </div>
            </div>
          )}

          {qrType === "vcard" && (
            <div className="space-y-3">
              <Input
                label="Full Name"
                value={vcardName}
                onChange={(e) => setVcardName(e.target.value)}
                placeholder="Jane Smith"
              />
              <Input
                label="Phone Number"
                value={vcardPhone}
                onChange={(e) => setVcardPhone(e.target.value)}
                placeholder="+1 234 567 8900"
              />
              <Input
                label="Email"
                value={vcardEmail}
                onChange={(e) => setVcardEmail(e.target.value)}
                placeholder="jane@company.com"
              />
            </div>
          )}

          {qrType === "email" && (
            <Input
              label="Recipient Email"
              value={vcardEmail}
              onChange={(e) => setVcardEmail(e.target.value)}
              placeholder="contact@company.com"
            />
          )}

          {/* Color Pickers */}
          <div className="grid grid-cols-2 gap-4 p-5 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 shadow-xs backdrop-blur-xl">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 block">
                QR Foreground
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/20 cursor-pointer p-0 bg-transparent"
                />
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300">{fgColor}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 block">
                Background
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/20 cursor-pointer p-0 bg-transparent"
                />
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300">{bgColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Preview */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white/80 dark:bg-[#0c1322]/80 rounded-3xl border border-slate-200/90 dark:border-white/10 text-center space-y-4 shadow-lg dark:shadow-xl backdrop-blur-xl">
          {qrDataUrl && (
            <div className="p-4 bg-white rounded-2xl shadow-md inline-block border border-slate-200 dark:border-white/20">
              <img src={qrDataUrl} alt="Generated QR Code" className="w-52 h-52 object-contain" />
            </div>
          )}

          <div className="w-full space-y-2">
            <a href={qrDataUrl} download={`qr_${qrType}.png`} className="block w-full">
              <Button variant="gradient" size="md" className="w-full" leftIcon={<QrCode className="w-4 h-4" />}>
                Download QR Code (PNG)
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

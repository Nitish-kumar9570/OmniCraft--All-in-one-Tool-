"use client";

import React, { useState } from "react";
import { AlertCircle, Clock } from "lucide-react";

export function JwtDecoderTool() {
  const [jwtToken, setJwtToken] = useState<string>(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.4zC..."
  );

  const decodeJwt = () => {
    try {
      const parts = jwtToken.trim().split(".");
      if (parts.length < 2) return null;

      const header = JSON.parse(decodeURIComponent(escape(atob(parts[0]))));
      const payload = JSON.parse(decodeURIComponent(escape(atob(parts[1]))));

      let expDate = null;
      if (payload.exp) {
        expDate = new Date(payload.exp * 1000).toLocaleString();
      }

      return { header, payload, expDate };
    } catch {
      return null;
    }
  };

  const decoded = decodeJwt();

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
          Paste Encoded JSON Web Token (JWT)
        </label>
        <textarea
          value={jwtToken}
          onChange={(e) => setJwtToken(e.target.value)}
          rows={3}
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xs dark:shadow-inner placeholder:text-slate-400 dark:placeholder:text-slate-500"
          placeholder="header.payload.signature"
        />
      </div>

      {decoded ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-rose-50/80 dark:bg-[#060a14] border border-rose-200 dark:border-white/10 space-y-2 shadow-xs">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 font-mono">HEADER: ALGORITHM & TOKEN TYPE</span>
            <pre className="text-xs font-mono text-rose-900 dark:text-rose-200 overflow-x-auto">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/80 dark:bg-[#060a14] border border-purple-200 dark:border-white/10 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 font-mono">PAYLOAD: DATA CLAIMS</span>
              {decoded.expDate && (
                <span className="text-[10px] text-amber-600 dark:text-amber-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" /> Exp: {decoded.expDate}
                </span>
              )}
            </div>
            <pre className="text-xs font-mono text-purple-900 dark:text-purple-200 overflow-x-auto">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Invalid JWT format (must have 3 parts separated by dots)</span>
        </div>
      )}
    </div>
  );
}

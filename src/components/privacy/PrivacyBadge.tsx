"use client";

import React, { useState } from "react";
import { Lock, Server, Cloud, ShieldCheck, Info } from "lucide-react";
import { ToolDefinition, ToolPrivacyMetadata } from "@/tools/types";
import { getToolPrivacy } from "@/tools/compatibility";
import { PrivacyDetailsModal } from "./PrivacyDetailsModal";
import { cn } from "@/lib/utils";

interface PrivacyBadgeProps {
  tool?: ToolDefinition;
  privacy?: ToolPrivacyMetadata;
  size?: "sm" | "md";
  showModalOnClick?: boolean;
  className?: string;
}

export function PrivacyBadge({
  tool,
  privacy: explicitPrivacy,
  size = "md",
  showModalOnClick = true,
  className
}: PrivacyBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const privacy: ToolPrivacyMetadata = explicitPrivacy || (tool ? getToolPrivacy(tool) : {
    type: "LOCAL",
    badgeLabel: "100% Client-Side",
    processing: "Client-side",
    dataUploaded: "No",
    dataStored: "No",
    thirdPartyServices: "None",
    description: "Runs entirely inside your browser memory without server transfers."
  });

  const isLocal = privacy.type === "LOCAL";
  const isServer = privacy.type === "SERVER";
  const isExternal = privacy.type === "EXTERNAL";

  const handleClick = (e: React.MouseEvent) => {
    if (showModalOnClick) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        title="Click to view privacy & security breakdown"
        className={cn(
          "inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-150 cursor-pointer active:scale-95 group",
          size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1",
          isLocal && "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20 shadow-2xs",
          isServer && "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25 hover:bg-amber-500/20 shadow-2xs",
          isExternal && "bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/25 hover:bg-purple-500/20 shadow-2xs",
          className
        )}
      >
        {isLocal && <Lock className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />}
        {isServer && <Server className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />}
        {isExternal && <Cloud className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />}
        <span>{privacy.badgeLabel}</span>
        {showModalOnClick && (
          <Info className={cn("w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity ml-0.5")} />
        )}
      </button>

      {showModalOnClick && (
        <PrivacyDetailsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          privacy={privacy}
          toolName={tool?.name}
        />
      )}
    </>
  );
}

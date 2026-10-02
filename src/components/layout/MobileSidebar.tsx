"use client";

import React, { useEffect } from "react";
import { Sidebar } from "./Sidebar";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar Drawer */}
      <div className="relative z-10 w-[280px] h-full shadow-2xl animate-in slide-in-from-left duration-200">
        <Sidebar
          isCollapsed={false}
          setIsCollapsed={() => {}}
          onCloseMobile={onClose}
        />
      </div>
    </div>
  );
}

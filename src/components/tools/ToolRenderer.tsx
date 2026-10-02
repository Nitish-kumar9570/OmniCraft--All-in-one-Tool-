"use client";

import React from "react";
import { getToolComponent } from "@/tools/implementations";

interface ToolRendererProps {
  slug: string;
  componentName?: string;
}

export function ToolRenderer({ slug, componentName }: ToolRendererProps) {
  const Component = getToolComponent(slug) || (componentName ? getToolComponent(componentName) : null);

  if (!Component) {
    return (
      <div className="p-8 text-center text-xs text-slate-500">
        Interactive workspace initialized. Please configure settings to begin.
      </div>
    );
  }

  return <Component />;
}

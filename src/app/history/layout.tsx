import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recently Used Tools | OmniCraft",
  robots: {
    index: false,
    follow: true,
  },
};

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

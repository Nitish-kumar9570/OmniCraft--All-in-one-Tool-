import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workspace | OmniCraft",
  robots: {
    index: false,
    follow: true,
  },
};

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

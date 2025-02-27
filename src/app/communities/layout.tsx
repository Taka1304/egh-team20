import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "コミュニティ",
  description: "コミュニティページ",
};

export default function CommunitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background">{children}</div>;
}

import Feature from "@/app/_features/About/Feature";
import Hero from "@/app/_features/About/Hero";
import TargetAudience from "@/app/_features/About/TargetAudience";
import ValueProposition from "@/app/_features/About/ValueProposition";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "キロクル | 成長を共有するコミュニティ",
  description: "個人が日々の学習・成長を記録しながら、同じ志を持つ仲間と繋がるコミュニティ型サービス",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-background to-card">
      <Hero />
      <TargetAudience />
      <ValueProposition />
      <Feature />
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <span className="text-center text-sm text-muted-foreground">&copy; 2025 Kirokuru. All rights reserved.</span>
      </footer>
    </main>
  );
}

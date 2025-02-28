import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/app/_features/ThemeSwitcher/ThemeProvider";
import { Providers } from "@/app/providers";
import { Toaster } from "@/components/ui/sonner";

const notoSans = localFont({
  src: "./fonts/NotoSansJP-Medium.ttf",
  variable: "--font-noto-sans-jp",
  weight: "400 700",
});

export const metadata: Metadata = {
  title: "キロクル",
  description: "キロクルは、日々の記録を簡単に残し、振り返ることができるサービスです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSans.variable} ${notoSans.className} antialiased`}>
        <ThemeProvider>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

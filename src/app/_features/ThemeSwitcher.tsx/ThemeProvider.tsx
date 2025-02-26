"use client";
import { selectedThemeAtom } from "@/app/_features/ThemeSwitcher.tsx/atom";
import { useAtom } from "jotai";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [selectedTheme] = useAtom(selectedThemeAtom);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (selectedTheme) {
      document.documentElement.className = selectedTheme;
    }
    return () => setMounted(false);
  }, [selectedTheme]);
  return mounted && <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

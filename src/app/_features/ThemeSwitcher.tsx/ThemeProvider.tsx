"use client";
import { selectedThemeAtom } from "@/app/_features/ThemeSwitcher.tsx/atom";
import { useAtom } from "jotai";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { useEffect } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [selectedTheme] = useAtom(selectedThemeAtom);

  useEffect(() => {
    if (selectedTheme) {
      document.documentElement.className = selectedTheme;
    }
  }, [selectedTheme]);
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

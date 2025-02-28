"use client";
import { selectedThemeAtom } from "@/app/_features/ThemeSwitcher/atom";
import { useAtom } from "jotai";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { useEffect, useState } from "react";

const DEFAULT_THEME = "primary";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [selectedTheme, setSelectedTheme] = useAtom(selectedThemeAtom);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!selectedTheme) {
      setSelectedTheme(DEFAULT_THEME);
    }
    const themeToApply = selectedTheme || DEFAULT_THEME;
    document.documentElement.className = themeToApply;

    return () => setMounted(false);
  }, [selectedTheme, setSelectedTheme]);

  return (
    mounted && (
      <NextThemesProvider {...props} defaultTheme={selectedTheme || DEFAULT_THEME}>
        {children}
      </NextThemesProvider>
    )
  );
}

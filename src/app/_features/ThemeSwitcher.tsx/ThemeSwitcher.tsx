import { isThemeModalOpenAtom, selectedThemeAtom, themes } from "@/app/_features/ThemeSwitcher.tsx/atom";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { Palette } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useAtom(isThemeModalOpenAtom);
  const [selectedTheme, setSelectedTheme] = useAtom(selectedThemeAtom);
  const { setTheme } = useTheme();

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    setTheme(theme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative w-10 h-10 rounded-full text-primary-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Palette className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 bg-primary-foreground border rounded-lg shadow-lg p-4 w-[280px] z-50"
          >
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => (
                <motion.button
                  key={theme.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleThemeChange(theme.name)}
                  className={`relative group p-3 rounded-lg border-2 transition-colors ${
                    selectedTheme === theme.name ? "border-primary" : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <div className="flex flex-wrap gap-1 mb-2">
                    {theme.colors.map((color) => (
                      <div key={color} className="w-6 h-6 rounded-full" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{theme.label}</span>
                  {selectedTheme === theme.name && (
                    <motion.div
                      layoutId="activeTheme"
                      className="absolute inset-0 border-2 border-primary rounded-lg"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

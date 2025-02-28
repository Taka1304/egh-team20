"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Tag } from "lucide-react";
import { useState } from "react";

type InterestsCategoryDropdownProps = {
  availableInterests: { id: string; name: string }[];
  selectedInterests: string[];
  onInterestToggle: (interestName: string) => void;
  isLoading: boolean;
};

export function InterestsCategoryDropdown({
  availableInterests,
  selectedInterests,
  onInterestToggle,
  isLoading,
}: InterestsCategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 relative">
      <h3 className="text-lg font-semibold mb-1">興味カテゴリー</h3>

      <div className="pt-1">
        <div className="border p-2 rounded-lg">
          {/* 選択済みカテゴリーの表示 */}
          <div className="flex flex-wrap gap-2 mb-2 ">
            {selectedInterests.length > 0 ? (
              selectedInterests.map((interest) => (
                <Badge key={interest} className="flex items-center gap-1">
                  {interest}
                  <Button className="l-1 w-4 h-4" variant={"ghost"} onClick={() => onInterestToggle(interest)}>
                    ×
                  </Button>
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">カテゴリが選択されていません</p>
            )}
          </div>

          <div className="relative">
            <Button
              variant="outline"
              className="flex items-center w-full justify-between"
              onClick={() => setIsOpen(!isOpen)}
              disabled={isLoading}
            >
              <span>カテゴリを選択</span>
              <Tag className="h-5 w-5" />
            </Button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 mt-2 w-full bg-card border rounded-lg shadow-lg p-4"
                >
                  {isLoading ? (
                    <p className="text-center py-2">読み込み中...</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                      {availableInterests.map((interest) => (
                        <motion.button
                          key={interest.id}
                          whileHover={{ scale: 0.95 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onInterestToggle(interest.id)}
                          className={`relative p-2 rounded-lg border transition-colors ${
                            selectedInterests.includes(interest.id)
                              ? "border-primary bg-primary/10"
                              : "border-transparent hover:border-primary/50"
                          }`}
                        >
                          <span className="text-sm font-medium">{interest.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

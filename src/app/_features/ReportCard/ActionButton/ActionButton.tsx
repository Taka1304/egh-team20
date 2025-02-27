"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

type ActionButtonProps = {
  icon: React.ElementType;
  label: string;
  count: number;
  onClick: () => void;
  active?: boolean;
};

export default function ActionButton({ icon: Icon, label, count, onClick, active = false }: ActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const iconColor = cn(
    "h-5 w-5 transition-colors",
    "stroke-current fill-current",
    active ? "text-pink-500 fill-pink-500" : isHovered ? "text-pink-400 fill-pink-400" : "text-gray-600 fill-gray-600",
  );

  return (
    <motion.button
      whileHover={{ scale: 1.06, y: -2 }} // ボタンがふわっと浮く
      whileTap={{ scale: 0.96 }}
      className={cn(
        "group relative flex items-center space-x-1 px-3 py-2 rounded-full",
        "shadow-md ring-1 ring-gray-200 transition-all duration-300",
        "bg-gradient-to-r from-white to-gray-50 hover:shadow-lg",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
        <Icon className={iconColor} />
      </motion.div>
      <span className="text-sm font-medium text-gray-700">{count}</span>
      <span className="sr-only">{label}</span>
    </motion.button>
  );
}

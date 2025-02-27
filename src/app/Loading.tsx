"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type LoaderProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

export default function Loading({ className, size = "md" }: LoaderProps) {
  const sizeMap = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const circleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: (i: number) => ({
      scale: [0, 1, 0],
      transition: {
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        delay: i * 0.1,
      },
    }),
  };

  return (
    <div className={cn("relative", sizeMap[size], className)}>
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <motion.svg viewBox="0 0 100 100" initial="hidden" animate="visible" className="w-full h-full">
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="opacity-10"
          variants={circleVariants}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="opacity-20"
          variants={circleVariants}
        />

        <motion.path
          d="M50,5 A45,45 0 0,1 95,50"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          variants={pathVariants}
          className="text-primary"
        />

        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={50 + Math.cos((i * 2 * Math.PI) / 3) * 25}
            cy={50 + Math.sin((i * 2 * Math.PI) / 3) * 25}
            r="3"
            fill="currentColor"
            custom={i}
            variants={dotVariants}
            className="text-primary"
          />
        ))}
      </motion.svg>
    </div>
  );
}

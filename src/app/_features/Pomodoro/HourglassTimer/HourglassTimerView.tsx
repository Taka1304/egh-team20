"use client";

import type { AnimationControls } from "framer-motion";
import { motion } from "framer-motion";

type HourglassTimerViewProps = {
  controls: AnimationControls;
  minutes: number;
  seconds: number;
  progress: number; // 砂が減った(または増えた)進捗(0~1)
  sandParticles: Array<{
    id: number;
    delay: number;
    x: number;
  }>;
  isRunning: boolean;
  isBreak: boolean;
  timeLeft: number;
};

export function HourglassTimerView({
  controls,
  minutes,
  seconds,
  progress,
  sandParticles,
  isRunning,
  isBreak,
  timeLeft,
}: HourglassTimerViewProps) {
  return (
    <div className="relative w-64 h-96">
      {/* 砂時計本体 */}
      <motion.div className="w-full h-full" animate={controls} style={{ rotate: isBreak ? 180 : 0 }}>
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: */}
        <svg
          viewBox="0 0 100 150"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))" }}
        >
          <defs>
            {/* 砂が見える範囲を切り抜くためのパス */}
            <clipPath id="upperSandClip">
              <path d="M35,75 L65,75 L80,20 L20,20 Z" />
            </clipPath>
            <clipPath id="lowerSandClip">
              <path d="M20,130 L80,130 L65,75 L35,75 Z" />
            </clipPath>
          </defs>

          {/* 上部ガラス */}
          <path
            d="M20,20 L80,20 L65,75 L35,75 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted-foreground/30"
          />

          {/* 下部ガラス */}
          <path
            d="M35,75 L65,75 L80,130 L20,130 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted-foreground/30"
          />

          {/* 上部の砂（clipPath でカット） */}
          <g clipPath="url(#upperSandClip)">
            <rect x="20" y="20" width="60" height={55 * (1 - progress)} className="fill-current opacity-80" />
          </g>

          {/* 下部の砂 */}
          <g clipPath="url(#lowerSandClip)">
            <rect
              x="20"
              y={130 - 55 * progress}
              width="60"
              height={55 * progress}
              className="fill-current opacity-80"
            />
          </g>

          {/* 下に落ちる砂粒アニメーション */}
          {isRunning &&
            sandParticles.map((particle) => (
              <motion.g key={particle.id}>
                <motion.circle
                  cx={50 + particle.x}
                  cy={75}
                  r={0.8}
                  className="fill-current"
                  initial={{ y: -25, opacity: 0 }}
                  animate={{
                    y: [null, 25],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: particle.delay,
                    ease: "easeIn",
                  }}
                />
                <motion.circle
                  cx={50 + particle.x}
                  cy={75}
                  r={0.3}
                  className="fill-current"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{
                    y: [null, 20],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: particle.delay + 0.2,
                    ease: "easeIn",
                  }}
                />
              </motion.g>
            ))}

          {/* 枠線 */}
          <path
            d="M20,20 L80,20 L65,75 L35,75 L20,20 M35,75 L65,75 L80,130 L20,130 L35,75"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          />
        </svg>
      </motion.div>

      {/* 中央の時間表示 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          key={timeLeft}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-4xl font-bold bg-background bg-opacity-50 px-4 py-2 rounded-lg"
        >
          {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
        </motion.div>
      </div>
    </div>
  );
}

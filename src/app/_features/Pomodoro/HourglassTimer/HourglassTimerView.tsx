"use client";

import type { AnimationControls } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
  minutes,
  seconds,
  progress,
  sandParticles,
  isRunning,
  isBreak,
  timeLeft,
}: HourglassTimerViewProps) {
  // 回転状態を追跡
  const [rotation, setRotation] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 回転変化の効果を適用
  useEffect(() => {
    if (isBreak) {
      setIsTransitioning(true);
      // 回転のアニメーション効果
      const timeout = setTimeout(() => {
        setRotation(180);
        setIsTransitioning(false);
      }, 500); // 回転アニメーションの時間
      return () => clearTimeout(timeout);
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      setIsTransitioning(true);
      const timeout = setTimeout(() => {
        setRotation(0);
        setIsTransitioning(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isBreak]);

  // 重力方向に基づく砂の挙動
  const isInverted = rotation === 180;

  // 砂の表示を制御（回転中は砂の動きを抑制）
  const displayProgress = isTransitioning ? (isInverted ? 0.05 : 0.95) : progress;

  return (
    <div className="relative w-64 h-96">
      {/* 砂時計本体 */}
      <motion.div
        className="w-full h-full"
        animate={{ rotate: rotation }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {/* SVG要素 */}
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
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
            strokeWidth="3"
            className="text-muted-foreground/30"
          />

          {/* 下部ガラス */}
          <path
            d="M35,75 L65,75 L80,130 L20,130 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-muted-foreground/30"
          />

          {/* 上部の砂 - 物理的に正しい表現 */}
          <g clipPath="url(#upperSandClip)">
            {!isInverted ? (
              // 通常状態: 上部の砂は下部から減少（底から徐々に空く）
              <rect
                x="20"
                y={20 + 55 * displayProgress}
                width="60"
                height={55 * (1 - displayProgress)}
                className="fill-primary-foreground opacity-40"
              />
            ) : (
              // 反転状態: 上部の砂は上から減少（上から徐々に空く）
              <rect x="20" y="20" width="60" height={55 * (1 - displayProgress)} className="fill-primary opacity-80" />
            )}
          </g>

          {/* 下部の砂 - 物理的に正しい表現 */}
          <g clipPath="url(#lowerSandClip)">
            {!isInverted ? (
              // 通常状態: 下部の砂は下から積み上がる
              <rect
                x="20"
                y={130 - 55 * displayProgress}
                width="60"
                height={55 * displayProgress}
                className="fill-primary-foreground opacity-40"
              />
            ) : (
              // 反転状態: 下部の砂は上から積み上がる
              <rect x="20" y={75} width="60" height={55 * displayProgress} className="fill-primary opacity-80" />
            )}
          </g>

          {/* 落下する砂粒 - 動くのは実行中かつ回転中でない場合のみ */}
          {isRunning && !isTransitioning && (
            <g>
              {sandParticles.map((particle) => (
                <motion.g key={particle.id}>
                  <motion.circle
                    cx={50 + particle.x}
                    cy={isInverted ? 20 : 75}
                    r={0.8}
                    className="fill-primary"
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                      y: isInverted ? [0, -55 * 0.8] : [0, 55 * 0.8],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: particle.delay,
                      ease: "easeIn",
                    }}
                  />
                </motion.g>
              ))}
            </g>
          )}

          {/* 回転中の砂のシミュレーション */}
          {isTransitioning && (
            <g>
              {Array.from({ length: 20 }).map((_, index) => {
                const randomX = Math.random() * 30 - 15;
                const randomY = Math.random() * 80 - 40;
                const size = 0.3 + Math.random() * 0.7;

                return (
                  <motion.circle
                    key={`transition-particle-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      index
                    }`}
                    cx={50 + randomX}
                    cy={75 + randomY}
                    r={size}
                    className="fill-primary"
                    initial={{
                      opacity: 0,
                      x: isInverted ? -randomX * 0.5 : randomX * 0.5,
                    }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      x: isInverted ? [randomX * 0.5, randomX] : [-randomX * 0.5, -randomX],
                    }}
                    transition={{
                      duration: 0.5,
                      delay: Math.random() * 0.3,
                    }}
                  />
                );
              })}
            </g>
          )}

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

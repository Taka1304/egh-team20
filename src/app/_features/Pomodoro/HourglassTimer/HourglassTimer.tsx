"use client";

import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { HourglassTimerView } from "./HourglassTimerView";

type HourglassTimerProps = {
  duration: number; // タイマーの合計時間(分)
  timeLeft: number; // 残り時間(秒)
  setTimeLeft: (time: number) => void;
  isRunning: boolean;
  onComplete: () => void;
  isBreak: boolean;
};

export function HourglassTimer({
  duration,
  timeLeft,
  setTimeLeft,
  isRunning,
  onComplete,
  isBreak,
}: HourglassTimerProps) {
  const controls = useAnimation();

  // タイマー制御（1秒毎に timeLeft を1減らす）
  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // 時間切れ時: 砂時計を180度回転させてから完了処理を呼ぶ
      controls
        .start({
          rotate: 180,
          transition: { duration: 1, ease: "easeInOut" },
        })
        .then(onComplete);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, setTimeLeft, onComplete, controls]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  // 全体に対してどのぐらい進んだか(0～1)
  const progress = 1 - timeLeft / (duration * 60);

  // 砂粒の生成
  const generateSandParticles = (count: number) => {
    return [...Array(count)].map((_, i) => ({
      id: i,
      delay: (i * 0.8) % 3,
      x: ((i % 3) - 1) * 3,
    }));
  };

  const sandParticles = generateSandParticles(12);

  return (
    <HourglassTimerView
      controls={controls}
      minutes={minutes}
      seconds={seconds}
      progress={progress}
      sandParticles={sandParticles}
      isRunning={isRunning}
      isBreak={isBreak}
      timeLeft={timeLeft}
    />
  );
}

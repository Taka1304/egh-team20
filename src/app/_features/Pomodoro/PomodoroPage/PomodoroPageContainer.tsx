"use client";

import { PomodoroPageView } from "@/app/_features/Pomodoro/PomodoroPage/PomodoroPageView";
import { useState } from "react";

export default function PomodoroPageContainer() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [isBreak, setIsBreak] = useState(false);
  const [sound, setSound] = useState(true);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(workDuration * 60);
    setIsBreak(false);
  };

  const handleComplete = () => {
    if (sound) {
      const audio = new Audio("/sound/pomodoro.mp3");
      audio.play();
    }
    setIsBreak(!isBreak);
    setTimeLeft(isBreak ? workDuration * 60 : breakDuration * 60);
  };

  return (
    <PomodoroPageView
      isRunning={isRunning}
      timeLeft={timeLeft}
      setTimeLeft={setTimeLeft}
      isBreak={isBreak}
      onComplete={handleComplete}
      workDuration={workDuration}
      setWorkDuration={setWorkDuration}
      breakDuration={breakDuration}
      setBreakDuration={setBreakDuration}
      sound={sound}
      setSound={setSound}
      onStart={handleStart}
      onPause={handlePause}
      onReset={handleReset}
    />
  );
}

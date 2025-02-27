"use client";

import { PomodoroPageView } from "@/app/_features/Pomodoro/PomodoroPage/PomodoroPageView";
import { useState } from "react";

export default function PomodoroPageContainer() {
  const [isRunning, setIsRunning] = useState(false);
  const [workDuration, setWorkDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [breakDuration, setBreakDuration] = useState(5);
  const [isBreak, setIsBreak] = useState(false);
  const [sound, setSound] = useState(true);

  const handleStart = () => {
    if (sound) {
      const audio = new Audio("/sound/pomodoro.mp3");
      audio.play();
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? breakDuration * 60 : workDuration * 60);
  };

  const handleWorkDurationChange = (value: number) => {
    setWorkDuration(value);
    if (!isRunning && !isBreak) {
      setTimeLeft(value * 60);
    }
  };

  const handleBreakDurationChange = (value: number) => {
    setBreakDuration(value);
    if (!isRunning && isBreak) {
      setTimeLeft(value * 60);
    }
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
      setWorkDuration={handleWorkDurationChange}
      breakDuration={breakDuration}
      setBreakDuration={handleBreakDurationChange}
      sound={sound}
      setSound={setSound}
      onStart={handleStart}
      onPause={handlePause}
      onReset={handleReset}
    />
  );
}

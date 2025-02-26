"use client";
import Header from "@/app/_features/Navigate/Header/Header";
import { HourglassTimer } from "@/app/_features/Pomodoro/HourglassTimer/HourglassTimer";
import { PomodoroHistory } from "@/app/_features/Pomodoro/PomodoroHistory";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export default function page() {
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
    <>
      <Header />
      <div className="min-h-screen bg-background pt-20 px-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-primary-foreground">ポモドーロタイマー</h1>
            <p className="text-muted-foreground">25分の集中と5分の休憩で、効率的に学習を進めましょう</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* タイマー */}
            <Card className="lg:col-span-2 p-8">
              <div className="space-y-8">
                <div className="flex justify-center">
                  <HourglassTimer
                    duration={isBreak ? breakDuration : workDuration}
                    timeLeft={timeLeft}
                    setTimeLeft={setTimeLeft}
                    isRunning={isRunning}
                    onComplete={handleComplete}
                    isBreak={isBreak}
                  />
                </div>

                <div className="flex justify-center space-x-4">
                  <Button size="lg" className="w-32" onClick={isRunning ? handlePause : handleStart}>
                    {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  <Button size="lg" variant="outline" className="w-32" onClick={handleReset}>
                    <RotateCcw className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-6">
              <h2 className="text-xl font-semibold">設定</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>作業時間 (分)</Label>
                  <Slider
                    value={[workDuration]}
                    onValueChange={(value) => setWorkDuration(value[0])}
                    min={1}
                    max={60}
                    step={1}
                  />
                  <p className="text-sm text-muted-foreground text-right">{workDuration}分</p>
                </div>

                <div className="space-y-2">
                  <Label>休憩時間 (分)</Label>
                  <Slider
                    value={[breakDuration]}
                    onValueChange={(value) => setBreakDuration(value[0])}
                    min={1}
                    max={30}
                    step={1}
                  />
                  <p className="text-sm text-muted-foreground text-right">{breakDuration}分</p>
                </div>

                <div className="flex items-center justify-between">
                  <Label>サウンド</Label>
                  <div className="flex items-center space-x-2">
                    {sound ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    <Switch checked={sound} onCheckedChange={setSound} />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <PomodoroHistory />
        </div>
      </div>
    </>
  );
}

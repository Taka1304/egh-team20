"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";
import type { KeyboardEvent } from "react";

type GoalInputFiledProps = {
  goals: string[];
  onChange: (goals: string[]) => void;
  disabled?: boolean;
};

export function GoalInputFiled({ goals, onChange, disabled = false }: GoalInputFiledProps) {
  const [inputValue, setInputValue] = useState("");

  const addGoal = () => {
    if (inputValue.trim()) {
      const newGoal = inputValue.trim();
      if (!goals.includes(newGoal)) {
        onChange([...goals, newGoal]);
      }
      setInputValue("");
    }
  };

  const removeGoal = (goalToRemove: string) => {
    onChange(goals.filter((goal) => goal !== goalToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addGoal();
    }
  };

  return (
    <div className="space-y-2">
      <div className="mt-4">
        <div className="border p-2 rounded-lg">
          <div className="flex flex-wrap gap-2">
            {goals.length > 0 ? (
              goals.map((goal) => (
                <Badge key={goal} variant="secondary" className="text-sm py-1">
                  {goal}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                    onClick={() => removeGoal(goal)}
                    disabled={disabled}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">目標が設定されていません</p>
            )}
          </div>
          <div className="flex gap-2 mt-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="新しい目標を入力（Enterで追加）"
              onKeyDown={handleKeyDown}
              disabled={disabled}
              className="flex-1 bg-chart-5"
            />
            <Button type="button" onClick={addGoal} disabled={!inputValue.trim() || disabled} variant="outline">
              追加
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import { GoalInputView } from "./GoalInputView";

type GoalInputFiledProps = {
  goals: string[];
  onChange: (goals: string[]) => void;
  disabled?: boolean;
};

export function GoalInputFiled({ goals, onChange, disabled = false }: GoalInputFiledProps) {
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;
    if (e.key === "Enter") {
      e.preventDefault();
      addGoal();
    }
  };

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

  return (
    <GoalInputView
      goals={goals}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onAddGoal={addGoal}
      onRemoveGoal={removeGoal}
      onKeyDown={handleKeyDown}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      disabled={disabled}
    />
  );
}

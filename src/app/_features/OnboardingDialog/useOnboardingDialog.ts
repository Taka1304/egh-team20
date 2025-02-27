"use client";

import { useGetRecommendedUsers } from "@/app/_features/Profile/ProfileRecommendedUsers/useGetRecommendedUsers";
import { useState } from "react";

export function useOnboardingDialog(onClose: () => void) {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const { recommendedUsers = [], isLoading } = useGetRecommendedUsers();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("登録完了:", { name, interests });
      onClose();
    }
  };

  return {
    currentStep,
    name,
    setName,
    interests,
    setInterests,
    recommendedUsers,
    isLoading,
    handleNext,
  };
}

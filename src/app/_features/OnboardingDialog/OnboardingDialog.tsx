"use client";

import { useGetRecommendedUsers } from "@/app/hooks/useGetRecommendedUsers";
import { useState } from "react";
import { OnboardingDialogView } from "./OnboardingDialogView";

type OnboardingProps = {
  onClose: () => void;
};

export function OnboardingDialog({ onClose }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  // フックを使用しておすすめのユーザーを取得
  const { recommendedUsers = [], isLoading } = useGetRecommendedUsers();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("登録完了:", { name, interests });
      onClose();
    }
  };

  return (
    <OnboardingDialogView
      currentStep={currentStep}
      name={name}
      setName={setName}
      interests={interests}
      setInterests={setInterests}
      recommendedUsers={recommendedUsers}
      isLoading={isLoading}
      onNext={handleNext}
      onClose={onClose}
    />
  );
}

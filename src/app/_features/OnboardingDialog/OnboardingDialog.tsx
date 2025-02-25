"use client";

import { useState } from "react";
import { OnboardingDialogView } from "./OnboardingDialogView";

type RecommendedUser = {
  id: number;
  name: string;
  handle: string;
  avatar: string;
};

type OnboardingProps = {
  onClose: () => void;
};

export function OnboardingDialog({ onClose }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  // おすすめのフォロワー（ダミーデータ）
  const recommendedUsers: RecommendedUser[] = [
    { id: 1, name: "山田 太郎", handle: "@yamada", avatar: "/user1.jpg" },
    { id: 2, name: "田中 花子", handle: "@tanaka", avatar: "/user2.jpg" },
    { id: 3, name: "佐藤 健", handle: "@sato", avatar: "/user3.jpg" },
  ];

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
      onNext={handleNext}
      onClose={onClose}
    />
  );
}

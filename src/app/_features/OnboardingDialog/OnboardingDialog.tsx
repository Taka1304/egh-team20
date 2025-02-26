"use client";

import { OnboardingDialogView } from "./OnboardingDialogView";
import { useOnboardingDialog } from "./useOnboardingDialog";

type OnboardingProps = {
  onClose: () => void;
};

export function OnboardingDialog({ onClose }: OnboardingProps) {
  const { currentStep, name, setName, interests, setInterests, recommendedUsers, isLoading, handleNext } =
    useOnboardingDialog(onClose);

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

"use client";

import { useInterests } from "@/app/hooks/useInterests";
import { OnboardingDialogView } from "./OnboardingDialogView";
import { useOnboardingDialog } from "./useOnboardingDialog";

type OnboardingProps = {
  onClose: () => void;
};

export function OnboardingDialog({ onClose }: OnboardingProps) {
  const { currentStep, name, setName, interests, setInterests, handleNext } = useOnboardingDialog(onClose);
  const { interests: interestOptions } = useInterests();

  return (
    <OnboardingDialogView
      interestOptions={interestOptions}
      currentStep={currentStep}
      name={name}
      setName={setName}
      interests={interests}
      setInterests={setInterests}
      onNext={handleNext}
      onClose={onClose}
    />
  );
}

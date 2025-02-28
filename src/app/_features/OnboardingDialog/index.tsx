"use client";
import { OnboardingDialog } from "@/app/_features/OnboardingDialog/OnboardingDialog";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const Onboarding = () => {
  const searchParams = useSearchParams();
  const isOnboarding = searchParams.has("onboarding");
  const [open, setOpen] = useState(isOnboarding);

  return <>{open && <OnboardingDialog onClose={() => setOpen(false)} />}</>;
};

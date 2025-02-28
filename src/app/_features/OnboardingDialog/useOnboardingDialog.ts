"use client";

import { client } from "@/lib/hono";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useOnboardingDialog(onClose: () => void) {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      if (!session?.user.id) {
        toast.error("ユーザー情報が取得できませんでした");
        return;
      }
      const toastId = toast.loading("保存中...");
      const res = await client.api.users[":id"].$patch({
        param: { id: session.user.id },
        json: {
          displayName: name ?? undefined,
          interests,
        },
      });
      if (!res.ok) {
        toast.error("保存に失敗しました", { id: toastId });
        return;
      }
      toast.success("保存しました", { id: toastId });
      router.replace("/");
      onClose();
    }
  };

  return {
    currentStep,
    name,
    setName,
    interests,
    setInterests,
    handleNext,
  };
}

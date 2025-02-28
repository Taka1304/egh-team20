"use client";

import { ProfileRecommendedUserCard } from "@/app/_features/Profile/ProfileRecommendedUsers/ProfileRecommendedUsersCard/ProfileRecommendedUserCard";
import { useRecommendUser } from "@/app/hooks/useRecommendUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Interest } from "@prisma/client";
import { X } from "lucide-react";

type OnboardingDialogViewProps = {
  interestOptions: Interest[];
  currentStep: number;
  name: string | null;
  setName: (value: string) => void;
  interests: string[];
  setInterests: (value: string[]) => void;
  onNext: () => void;
  onClose: () => void;
};

export function OnboardingDialogView({
  interestOptions,
  currentStep,
  name,
  setName,
  interests,
  setInterests,
  onNext,
  onClose,
}: OnboardingDialogViewProps) {
  const { recommendedUsers, isLoading, followUser, unfollowUser } = useRecommendUser();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-card p-6 rounded-lg shadow-lg w-[500px] max-w-full text-card-foreground relative min-h-96 pb-16">
        {/* 閉じるボタン */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        >
          <X className="w-6 h-6" />
        </button>

        {/* ステップごとのコンテンツ */}
        {currentStep === 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">キロクルの世界へ ようこそ！</h2>
            <p className="text-muted-foreground mb-4">快適にご利用いただくために、セットアップを始めます</p>
            <p className="text-muted-foreground mb-4">
              これらの設定はいつでも変更することができます。右上の ✖ を押して、スキップしても構いません。
            </p>
          </>
        )}

        {currentStep === 1 && (
          <>
            <h2 className="text-xl font-bold mb-6">表示名を設定しましょう （1/3）</h2>
            <p className="text-muted-foreground mb-2 opacity-80">※この名前は他のユーザーに表示されます</p>
            <Input
              className="border border-foreground w-full"
              value={name ?? ""}
              onChange={(e) => setName(e.target.value)}
              placeholder="Anonymous"
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-xl font-bold mb-6">興味のあるジャンルを選択してください（2/3）</h2>
            <div className="grid grid-cols-2 gap-2">
              {isLoading ? (
                <></>
              ) : (
                interestOptions.map((option) => (
                  <Button
                    key={option.id}
                    className={`border rounded-md p-2 ${interests.includes(option.id) ? "bg-primary text-white" : "bg-card text-card-foreground"}`}
                    onClick={() =>
                      setInterests(
                        interests.includes(option.id)
                          ? interests.filter((g) => g !== option.id)
                          : [...interests, option.id],
                      )
                    }
                  >
                    {option.name}
                  </Button>
                ))
              )}
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <h2 className="text-xl font-bold mb-6">フォローしてみましょう（3/3）</h2>
            <p className="text-muted-foreground mb-4">似た興味を持っているようです</p>
            {isLoading ? (
              <p>ローディング中...</p>
            ) : (
              <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 gap-2">
                {recommendedUsers.map((user) => (
                  <ProfileRecommendedUserCard
                    user={user}
                    key={user.id}
                    onFollow={followUser}
                    onUnfollow={unfollowUser}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* 次へボタン */}
        <div className="absolute bottom-4 right-6">
          <Button variant="default" onClick={onNext}>
            {currentStep === 3 ? "完了" : "次へ"}
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { ProfileRecommendedUserCard } from "@/app/_features/Profile/ProfileRecommendedUsers/ProfileRecommendedUsersCard/ProfileRecommendedUserCard";
import { useRecommendUser } from "@/app/hooks/useRecommendUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

type OnboardingDialogViewProps = {
  currentStep: number;
  name: string;
  setName: (value: string) => void;
  interests: string[];
  setInterests: (value: string[]) => void;
  onNext: () => void;
  onClose: () => void;
};

export function OnboardingDialogView({
  currentStep,
  name,
  setName,
  interests,
  setInterests,
  onNext,
  onClose,
}: OnboardingDialogViewProps) {
  // 興味のあるジャンル（ダミーデータ）
  const genreOptions = ["Web開発", "AI", "デザイン", "ゲーム開発", "ビジネス"];
  const { recommendedUsers, isLoading, followUser, unfollowUser } = useRecommendUser();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-card p-6 rounded-lg shadow-lg w-[500px] max-w-full text-card-foreground relative">
        {/* 閉じるボタン */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        >
          <X className="w-6 h-6" />
        </button>

        {/* ステップごとのコンテンツ */}
        {currentStep === 1 && (
          <>
            <h2 className="text-xl font-bold mb-2">簡単なアンケートにご協力ください（1/3）</h2>
            <p className="text-muted-foreground mb-4">お名前を入力してください</p>
            <Input
              className="border border-foreground w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="名前"
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-xl font-bold mb-2">簡単なアンケートにご協力ください（2/3）</h2>
            <p className="text-muted-foreground mb-4">興味のあるジャンルを選択してください</p>
            <div className="grid grid-cols-2 gap-2">
              {genreOptions.map((genre) => (
                <Button
                  key={genre}
                  className={`border rounded-md p-2 ${interests.includes(genre) ? "bg-primary text-white" : "bg-card text-card-foreground"}`}
                  onClick={() =>
                    setInterests(
                      interests.includes(genre) ? interests.filter((g) => g !== genre) : [...interests, genre],
                    )
                  }
                >
                  {genre}
                </Button>
              ))}
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <h2 className="text-xl font-bold mb-2">簡単なアンケートにご協力ください（3/3）</h2>
            <p className="text-muted-foreground mb-4">おすすめのフォロワーを選択してください</p>
            {isLoading ? (
              <p>ローディング中...</p>
            ) : (
              <div className="grid grid-cols-1 gap-2">
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
        <div className="mt-6 text-right">
          <Button variant="default" onClick={onNext}>
            {currentStep === 3 ? "完了" : "次へ"}
          </Button>
        </div>
      </div>
    </div>
  );
}

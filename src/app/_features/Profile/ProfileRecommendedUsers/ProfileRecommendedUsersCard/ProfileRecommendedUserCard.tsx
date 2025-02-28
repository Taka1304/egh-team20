import type { RecommendedUser } from "@/app/hooks/useRecommendUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type ProfileRecommendedUserCardProps = {
  user: RecommendedUser;
  onFollow: (userId: string) => Promise<boolean>;
  onUnfollow: (userId: string) => Promise<boolean>;
};

export function ProfileRecommendedUserCard({ user, onFollow, onUnfollow }: ProfileRecommendedUserCardProps) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowClick = async () => {
    setIsLoading(true);
    try {
      if (isFollowing) {
        const success = await onUnfollow(user.id);
        if (success) setIsFollowing(false);
      } else {
        const success = await onFollow(user.id);
        if (success) setIsFollowing(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-48 bg-primary-foreground rounded-lg shadow-md border overflow-hidden flex-shrink-0">
      {/* プロフィール画像 */}
      <div className="w-full h-24 bg-primary-foreground flex items-center justify-center">
        <Avatar className="w-16 h-16 rounded-full border border-gray-300">
          <AvatarImage src={user.image ?? ""} alt={`${user.displayName || ""}のアイコン`} />
          <AvatarFallback className="bg-muted text-muted-foreground">
            {(user.displayName || "U").charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* ユーザー情報 */}
      <div className="p-2 text-center">
        <p className="font-bold text-sm">{user.displayName || "ユーザー"}</p>
        {/* 興味・関心エリア */}
        <div className="flex flex-wrap justify-center gap-1 mt-1">
          {user.interests.slice(0, 2).map((interest) => (
            <Badge key={interest} variant="outline" className="text-xs">
              {interest}
            </Badge>
          ))}
          {user.interests.length > 2 && (
            <span className="text-xs text-muted-foreground">+{user.interests.length - 2}</span>
          )}
        </div>
      </div>

      {/* フォローボタン */}
      <div className="p-2">
        <Button
          variant={isFollowing ? "outline" : "default"}
          size="sm"
          onClick={handleFollowClick}
          disabled={isLoading}
          className="w-full flex items-center justify-center"
        >
          {isLoading ? "処理中..." : isFollowing ? "フォロー中" : "フォロー"}
        </Button>
      </div>
    </div>
  );
}

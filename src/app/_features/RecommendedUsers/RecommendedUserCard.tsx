import type { RecommendedUser } from "@/app/hooks/useRecommendUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type RecommendedUserCardProps = {
  user: RecommendedUser;
  onFollow?: (userId: string) => Promise<boolean>;
  onUnfollow?: (userId: string) => Promise<boolean>;
};

export function RecommendedUserCard({ user, onFollow, onUnfollow }: RecommendedUserCardProps) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    if (!onFollow || !onUnfollow) {
      // フォロー機能が提供されていない場合は何もしない
      return;
    }

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
    <div className="flex items-center p-4 border border-primary-foreground rounded-lg">
      <Avatar className="h-10 w-10 mr-3">
        <AvatarImage src={user.image ?? ""} alt={`${user.displayName}のアバター`} />
        <AvatarFallback>{user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <p className="font-medium">{user.displayName || "無名ユーザー"}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {user.interests.slice(0, 3).map((interest) => (
            <Badge key={interest} variant="outline" className="text-xs">
              {interest}
            </Badge>
          ))}
          {user.interests.length > 3 && (
            <span className="text-xs text-muted-foreground">+{user.interests.length - 3}</span>
          )}
        </div>
      </div>

      {onFollow && onUnfollow && (
        <Button variant={isFollowing ? "outline" : "default"} size="sm" onClick={handleFollow} disabled={isLoading}>
          {isLoading ? "処理中..." : isFollowing ? "フォロー中" : "フォローする"}
        </Button>
      )}
    </div>
  );
}

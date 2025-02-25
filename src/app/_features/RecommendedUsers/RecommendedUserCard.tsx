import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { User } from "@prisma/client";
import { useState } from "react";

type RecommendedUserCardProps = {
  user: User;
};

export function RecommendedUserCard({ user }: RecommendedUserCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between p-2 border border-primary-foreground rounded-lg">
      {/* ユーザー情報 */}
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.image ?? ""} alt={`${user.name}のアイコン`} />
          <AvatarFallback className="bg-muted text-muted-foreground">
            {user.name?.charAt(0).toUpperCase() ?? ""}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-card-foreground">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.bio}</p>
        </div>
      </div>

      {/* フォローボタン */}
      <Button variant={isFollowing ? "outline" : "default"} size="sm" onClick={handleFollow} className="font-bold">
        {isFollowing ? "フォロー中" : "フォロー"}
      </Button>
    </div>
  );
}

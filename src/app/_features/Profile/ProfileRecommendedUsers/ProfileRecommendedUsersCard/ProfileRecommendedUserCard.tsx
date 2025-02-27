import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { User } from "@prisma/client";
import { X } from "lucide-react"; // 閉じるボタン用アイコン
import { useState } from "react";

type ProfileRecommendedUserCardProps = {
  user: User;
};

export function ProfileRecommendedUserCard({ user }: ProfileRecommendedUserCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <div className="relative w-48 bg-primary-foreground rounded-lg shadow-md border overflow-hidden flex-shrink-0">
      {/* 閉じるボタン */}
      <Button className="absolute top-2 right-2 p-1 rounded-full bg-primary-foreground">
        <X size={16} className="text-gray-600" />
      </Button>

      {/* プロフィール画像 */}
      <div className="w-full h-24 bg-primary-foreground flex items-center justify-center">
        <Avatar className="w-16 h-16 rounded-full border border-gray-300">
          <AvatarImage src={user.image ?? ""} alt={`${user.name}のアイコン`} />
          <AvatarFallback className="bg-muted text-muted-foreground">
            {user.name?.charAt(0).toUpperCase() ?? ""}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* ユーザー情報 */}
      <div className="p-2 text-center">
        <p className="font-bold text-sm">{user.name}</p>
        {user.bio && <p className="text-xs text-background truncate">@{user.id}</p>}
      </div>

      {/* フォローボタン */}
      <div className="p-2">
        <Button
          variant={isFollowing ? "outline" : "default"}
          size="sm"
          onClick={handleFollow}
          className="w-full flex items-center justify-center"
        >
          {isFollowing ? "フォロー中" : "フォロー"}
        </Button>
      </div>
    </div>
  );
}

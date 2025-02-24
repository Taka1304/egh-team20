import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type RecommendedUser = {
  id: number;
  name: string;
  handle: string;
  avatar: string;
};

type RecommendedUserCardProps = {
  user: RecommendedUser;
};

export function RecommendedUserCard({ user }: RecommendedUserCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="flex items-center justify-between p-2 border border-border rounded-lg">
      {/* ユーザー情報 */}
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar} alt={`${user.name}のアイコン`} />
          <AvatarFallback className="bg-muted text-muted-foreground">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-card-foreground">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.handle}</p>
        </div>
      </div>

      {/* フォローボタン */}
      <Button variant={isFollowing ? "outline" : "default"} size="sm" onClick={() => setIsFollowing(!isFollowing)}>
        {isFollowing ? "フォロー中" : "フォロー"}
      </Button>
    </div>
  );
}

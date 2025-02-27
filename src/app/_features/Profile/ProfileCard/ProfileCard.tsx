import type { User } from "@/app/profile/[username]/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type ProfileCardProps = {
  user: User;
};

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center mt-20 bg-card py-6 border border-primary-foreground rounded-xl">
      <Avatar className="w-32 h-32">
        <AvatarImage src={user.profileImageUrl} alt={user.displayName} />
        <AvatarFallback>{user.displayName}</AvatarFallback>
      </Avatar>
      <h1 className="mt-4 text-3xl font-bold text-primary-foreground">{user.displayName}</h1>
      <p className="text-muted-foreground">@{user.username}</p>
      <div className="mt-2 flex space-x-4">
        <div className="text-center">
          <p className="font-semibold text-lg text-primary-foreground">{user.followersCount}</p>
          <p className="text-sm text-muted-foreground">フォロワー</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-lg text-primary-foreground">{user.followingCount}</p>
          <p className="text-sm text-muted-foreground">フォロー中</p>
        </div>
      </div>
      <Button className="mt-4 text-foreground" variant="outline">
        プロフィールを編集
      </Button>
    </div>
  );
}

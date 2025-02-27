import type { ProfileUser } from "@/app/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type ProfileCardProps = {
  user: ProfileUser;
};

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center mt-20 bg-card py-6 border border-primary-foreground rounded-xl">
      <Avatar className="w-32 h-32">
        <AvatarImage src={user.image || ""} alt={user.displayName || ""} />
        <AvatarFallback>{user.displayName?.charAt(0) || user.name?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>
      <h1 className="mt-4 text-3xl font-bold text-primary-foreground">{user.displayName || user.name}</h1>
      <p className="text-muted-foreground">@{user.email?.split("@")[0]}</p>
      <div className="mt-2 flex space-x-4">
        <div className="text-center">
          {/* Todo フォロー中とフォロワーが逆 */}
          <p className="font-semibold text-lg text-primary-foreground">{user.followerCount}</p>
          <p className="text-sm text-muted-foreground">フォロー中</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-lg text-primary-foreground">{user.followingCount}</p>
          <p className="text-sm text-muted-foreground">フォロワー</p>
        </div>
      </div>
      <Button className="mt-4 text-foreground" variant="outline">
        プロフィールを編集
      </Button>
    </div>
  );
}

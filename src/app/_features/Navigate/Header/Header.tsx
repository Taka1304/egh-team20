"use client";

import { UserMenu } from "@/app/_features/Navigate/Header/UserMenu/UserMenu";
import { NotificationModal } from "@/app/_features/NotificationModal/NotificationModal";
import { ThemeSwitcher } from "@/app/_features/ThemeSwitcher/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, LandPlot, Search, Timer } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handlePostClick = () => {
    router.push("/reports/new");
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleTimerClick = () => {
    router.push("/pomodoro");
  };

  const handleCommunityClick = () => {
    router.push("/communities");
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-background border-b border-secondary z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <nav className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="relative w-10 h-10 rounded-full text-primary-foreground"
            onClick={handleHomeClick}
          >
            <Home className="h-5 w-5" />
          </Button>
          <NotificationModal />
          <Button
            variant="ghost"
            size="icon"
            className="relative w-10 h-10 rounded-full text-primary-foreground"
            onClick={handleTimerClick}
          >
            <Timer className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative w-10 h-10 rounded-full text-primary-foreground"
            onClick={handleCommunityClick}
          >
            <LandPlot className="h-5 w-5" />
          </Button>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="検索"
              className="pl-8 bg-muted text-primary-foreground border-muted-foreground focus:border-primary focus:ring-ring"
            />
          </div>
          <ThemeSwitcher />
          {session?.user ? (
            // ユーザーがログインしている場合は UserMenu を表示
            <UserMenu
              user={{
                ...session.user,
                name: session.user.name ?? session.user.displayName ?? "ゲスト",
              }}
            />
          ) : (
            // 未ログインの場合はログインボタンのみを表示
            <Button variant="ghost" onClick={() => signIn()}>
              ログイン
            </Button>
          )}
          <Button className="bg-primary hover:bg-foreground" onClick={handlePostClick}>
            投稿する
          </Button>
        </div>
      </div>
    </div>
  );
}

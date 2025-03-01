"use client";

import { PostCreationButton } from "@/app/_features/Navigate/Header/PostCreationButton/PostCreationButton";
import { UserMenu } from "@/app/_features/Navigate/Header/UserMenu/UserMenu";
import { NotificationModal } from "@/app/_features/NotificationModal/NotificationModal";
import { ThemeSwitcher } from "@/app/_features/ThemeSwitcher/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, LandPlot, Menu, Timer } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleTimerClick = () => {
    router.push("/pomodoro");
  };

  const handleCommunityClick = () => {
    router.push("/communities");
  };

  const navItems = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "ホーム",
      onClick: handleHomeClick,
    },
    {
      icon: <Timer className="h-5 w-5" />,
      label: "タイマー",
      onClick: handleTimerClick,
    },
    {
      icon: <LandPlot className="h-5 w-5" />,
      label: "コミュニティ",
      onClick: handleCommunityClick,
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-background border-b border-secondary z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* モバイル用ハンバーガーメニュー */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative w-10 h-10 rounded-full text-primary-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">メニューを開く</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.label} onClick={item.onClick} className="cursor-pointer">
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <nav className="hidden md:flex items-center space-x-3">
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

        <div className="flex items-center space-x-2 md:space-x-4">
          <ThemeSwitcher />
          <span className="md:hidden">
            <NotificationModal />
          </span>
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
            <Button variant="outline" className="text-primary-foreground border-secondary" onClick={() => signIn()}>
              ログイン
            </Button>
          )}
          <PostCreationButton />
        </div>
      </div>
    </div>
  );
}

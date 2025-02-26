"use client";

import { ThemeSwitcher } from "@/app/_features/ThemeSwitcher.tsx/ThemeSwitcher";
import { UserMenu } from "@/app/_features/UserMenu/UserMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Home, Search } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-background border-b border-secondary z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <nav className="flex items-center space-x-8">
          <Link href="/" className="text-foreground hover:text-secondary">
            <Home className="h-5 w-5" />
          </Link>
          <Link href="/notifications" className="text-foreground hover:text-secondary">
            <Bell className="h-5 w-5" />
          </Link>
          <Link href="/profile" className="text-foreground hover:text-secondary">
            {/* プロフィールリンク */}
          </Link>
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
            <UserMenu user={session.user} />
          ) : (
            // 未ログインの場合はログインボタンのみを表示
            <Button variant="ghost" onClick={() => signIn()}>
              ログイン
            </Button>
          )}
          {/*
            <Avatar className="h-8 w-8">
              <AvatarImage src={session?.user.image ?? ""} />
              <AvatarFallback className="text-foreground">{session?.user.displayName}</AvatarFallback>
            </Avatar>
          */}
          <Button className="bg-primary hover:bg-foreground" onClick={onOpenPostModal}>
            投稿する
          </Button>
        </div>
      </div>
    </div>
  );
}

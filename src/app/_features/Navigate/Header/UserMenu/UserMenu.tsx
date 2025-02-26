"use client";

import { menuItems } from "@/app/_features/Navigate/Header/UserMenu/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type User = {
  image?: string | null;
  name: string;
  email?: string | null;
};

type UserMenuProps = {
  user: User;
};

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // ログアウト処理(未実装)
  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image ?? ""} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent className="w-80" align="end" asChild forceMount>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* ユーザー情報 */}
              <div className="flex items-center gap-4 p-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.image ?? ""} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />

              {/* メニュー項目 */}
              {menuItems.map((group) => (
                <div key={group.label}>
                  <DropdownMenuLabel className="font-normal text-xs text-muted-foreground px-4 py-2">
                    {group.label}
                  </DropdownMenuLabel>
                  <DropdownMenuGroup>
                    {group.items.map((item) => {
                      const href = item.label === "プロフィール" ? `/profile/${user.name}` : item.link;
                      return (
                        <DropdownMenuItem key={item.label}>
                          <Link
                            href={href}
                            className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:scale-95 duration-100"
                          >
                            <item.icon className="h-4 w-4" />
                            <span className="flex-1">{item.label}</span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </div>
              ))}

              {/* ログアウトボタン */}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center gap-3 px-4 py-3 text-red-500 cursor-pointer focus:text-red-500"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="flex-1">ログアウト</span>
              </DropdownMenuItem>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Home, Search, User } from "lucide-react";
import Link from "next/link";

type HeaderViewProps = {
  onOpenPostModal: () => void;
};

export function HeaderView({ onOpenPostModal }: HeaderViewProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-colorTheme-purple-tertiary border-b border-colorTheme-purple-sub z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <nav className="flex items-center space-x-8">
          <Link href="/" className="text-white hover:text-colorTheme-purple-secondary">
            <Home className="h-5 w-5" />
          </Link>
          <Link href="/notifications" className="text-white hover:text-colorTheme-purple-secondary">
            <Bell className="h-5 w-5" />
          </Link>
          <Link href="/profile" className="text-white hover:text-colorTheme-purple-secondary">
            <User className="h-5 w-5" />
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="検索"
              className="pl-8 bg-gray-50 border-gray-200 focus:border-colorTheme-purple-primary focus:ring-colorTheme-purple-primary"
            />
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>ユ</AvatarFallback>
          </Avatar>
          <Button
            className="bg-colorTheme-purple-primary hover:bg-colorTheme-purple-primary/50"
            onClick={onOpenPostModal}
          >
            投稿する
          </Button>
        </div>
      </div>
    </div>
  );
}

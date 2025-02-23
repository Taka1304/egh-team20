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
    <div className="fixed top-0 left-0 right-0 h-14 bg-background border-b border-secondary z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <nav className="flex items-center space-x-8">
          <Link href="/" className="text-primary-foreground hover:text-secondary">
            <Home className="h-5 w-5" />
          </Link>
          <Link href="/notifications" className="text-primary-foreground hover:text-secondary">
            <Bell className="h-5 w-5" />
          </Link>
          <Link href="/profile" className="text-primary-foreground hover:text-secondary">
            <User className="h-5 w-5" />
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
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback className="text-foreground">ユ</AvatarFallback>
          </Avatar>
          <Button className="bg-primary hover:bg-foreground" onClick={onOpenPostModal}>
            投稿する
          </Button>
        </div>
      </div>
    </div>
  );
}

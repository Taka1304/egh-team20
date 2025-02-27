"use client";

import Header from "@/app/_features/Navigate/Header/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hash, Menu, MessageSquare, Plus, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// モックデータ
const communities = [
  { id: "1", name: "プログラミング学習", description: "プログラミング学習に関するコミュニティ" },
  { id: "2", name: "Web開発", description: "Web開発に関するコミュニティ" },
  { id: "3", name: "モバイルアプリ開発", description: "モバイルアプリ開発に関するコミュニティ" },
  { id: "4", name: "デザイン", description: "デザインに関するコミュニティ" },
  { id: "5", name: "AI・機械学習", description: "AI・機械学習に関するコミュニティ" },
];

const threads = [
  {
    id: "1",
    title: "Next.jsの使い方について",
    content: "Next.jsでアプリを作っていますが、App Routerの使い方がわかりません。誰か教えてください。",
    authorId: "1",
    authorName: "山田太郎",
    authorImage: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-02-25T10:30:00Z",
    commentsCount: 5,
  },
];

const members = [
  { id: "1", name: "山田太郎", image: "/placeholder.svg?height=40&width=40", role: "ADMIN" },
  { id: "2", name: "佐藤花子", image: "/placeholder.svg?height=40&width=40", role: "MEMBER" },
  { id: "3", name: "鈴木一郎", image: "/placeholder.svg?height=40&width=40", role: "MEMBER" },
];

export default function CommunitiesPage() {
  const [selectedCommunity, setSelectedCommunity] = useState(communities[0]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileMembers, setShowMobileMembers] = useState(false);
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* ヘッダー */}
      <Header />

      {/* メインコンテンツ */}
      <div className="flex flex-1 pt-14 h-[calc(100vh-56px)]">
        {/* モバイルメニューボタン */}
        <div className="md:hidden fixed top-16 left-0 z-50 p-4">
          <Button variant="ghost" size="icon" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* モバイルメンバーボタン */}
        <div className="md:hidden fixed top-16 right-0 z-50 p-4">
          <Button variant="ghost" size="icon" onClick={() => setShowMobileMembers(!showMobileMembers)}>
            <Users className="h-6 w-6" />
          </Button>
        </div>

        {/* コミュニティサイドバー */}
        <div
          className={`${
            showMobileMenu ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:relative z-40 w-64 h-[calc(100vh-56px)] bg-card border-r transition-transform duration-200 ease-in-out`}
        >
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="コミュニティを検索" className="pl-8" />
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-160px)]">
            <div className="p-2 space-y-1">
              {communities.map((community) => (
                <Button
                  key={community.id}
                  variant={selectedCommunity.id === community.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setSelectedCommunity(community);
                    setShowMobileMenu(false);
                  }}
                >
                  <Hash className="mr-2 h-4 w-4" />
                  {community.name}
                </Button>
              ))}
            </div>
          </ScrollArea>
          <div className="absolute bottom-0 w-full p-4 border-t bg-card">
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              新規コミュニティ
            </Button>
          </div>
        </div>

        {/* スレッド一覧 */}
        <div className="flex-1 h-[calc(100vh-56px)] overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">スレッド一覧</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新規スレッド
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="p-4 space-y-4">
              {threads.map((thread) => (
                <button
                  type="button"
                  key={thread.id}
                  className="border rounded-lg p-4 bg-card hover:bg-card/80 cursor-pointer transition-colors text-left w-full"
                  onClick={() => router.push(`/communities/${selectedCommunity.id}/threads/${thread.id}`)}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={thread.authorImage} alt={thread.authorName} />
                      <AvatarFallback>{thread.authorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{thread.authorName}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(thread.createdAt)}</p>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{thread.title}</h3>
                  <p className="text-muted-foreground line-clamp-2">{thread.content}</p>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>{thread.commentsCount}件のコメント</span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* メンバー一覧サイドバー */}
        <div
          className={`${
            showMobileMembers ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0 fixed md:relative right-0 z-40 w-64 h-[calc(100vh-56px)] bg-card border-l transition-transform duration-200 ease-in-out`}
        >
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">メンバー</h2>
          </div>
          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="p-4 space-y-2">
              {members.map((member) => (
                <div key={member.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-sm font-medium">{member.name}</span>
                    <p className="text-xs text-muted-foreground">{member.role === "ADMIN" ? "管理者" : "メンバー"}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

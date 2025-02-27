"use client";

import { CommunitySidebar } from "@/app/_features/Community/CommunitySidebar/CommunitySidebar";
import type { Community } from "@/app/_features/Community/CommunitySidebar/CommunitySidebar";
import MemberSidebar from "@/app/_features/Community/MemberSidebar/MemberSidebar";
import type { Member } from "@/app/_features/Community/MemberSidebar/MemberSidebar";
import { ThreadList } from "@/app/_features/Community/ThreadList/ThreadList";
import type { Thread } from "@/app/_features/Community/ThreadList/ThreadList";
import Header from "@/app/_features/Navigate/Header/Header";
import { Button } from "@/components/ui/button";
import { Menu, Users } from "lucide-react";
import { useState } from "react";

const communities: Community[] = [
  { id: "1", name: "プログラミング学習", description: "プログラミング学習に関するコミュニティ" },
  { id: "2", name: "Web開発", description: "Web開発に関するコミュニティ" },
  { id: "3", name: "モバイルアプリ開発", description: "モバイルアプリ開発に関するコミュニティ" },
  { id: "4", name: "デザイン", description: "デザインに関するコミュニティ" },
  { id: "5", name: "AI・機械学習", description: "AI・機械学習に関するコミュニティ" },
];

const threads: Thread[] = [
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

const members: Member[] = [
  { id: "1", name: "山田太郎", image: "/placeholder.svg?height=40&width=40", role: "ADMIN" },
  { id: "2", name: "佐藤花子", image: "/placeholder.svg?height=40&width=40", role: "MEMBER" },
  { id: "3", name: "鈴木一郎", image: "/placeholder.svg?height=40&width=40", role: "MEMBER" },
];

export default function CommunitiesPage() {
  const [selectedCommunity, setSelectedCommunity] = useState<Community>(communities[0]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileMembers, setShowMobileMembers] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <Header />

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

      <div className="flex flex-1 pt-14 h-[calc(100vh-56px)]">
        <CommunitySidebar
          communities={communities}
          selectedCommunityId={selectedCommunity.id}
          onSelectCommunity={(community) => setSelectedCommunity(community)}
          isMobileOpen={showMobileMenu}
          onCloseMobileMenu={() => setShowMobileMenu(false)}
        />

        <ThreadList threads={threads} communityId={selectedCommunity.id} />

        <MemberSidebar members={members} isMobileOpen={showMobileMembers} />
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hash, Plus, Search } from "lucide-react";

export type Community = {
  id: string;
  name: string;
  description: string;
};

type CommunitySidebarProps = {
  communities: Community[];
  selectedCommunityId: string;
  onSelectCommunity: (community: Community) => void;
  isMobileOpen: boolean;
  onCloseMobileMenu: () => void;
};

export function CommunitySidebar({
  communities,
  selectedCommunityId,
  onSelectCommunity,
  isMobileOpen,
  onCloseMobileMenu,
}: CommunitySidebarProps) {
  return (
    <div
      className={`${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
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
              variant={selectedCommunityId === community.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                onSelectCommunity(community);
                onCloseMobileMenu();
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
  );
}

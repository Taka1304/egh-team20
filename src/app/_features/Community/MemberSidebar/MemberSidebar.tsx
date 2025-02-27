"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export type Member = {
  id: string;
  name: string;
  image: string;
  role: "ADMIN" | "MEMBER";
};

type MemberSidebarProps = {
  members: Member[];
  isMobileOpen: boolean;
};

export default function MemberSidebar({ members, isMobileOpen }: MemberSidebarProps) {
  return (
    <div
      className={`${
        isMobileOpen ? "translate-x-0" : "translate-x-full"
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
  );
}

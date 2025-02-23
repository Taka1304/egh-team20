"use client";
import { HeaderView } from "@/app/_features/Navigate/Header/HeaderView";
import { useState } from "react";

export function Header() {
  // モーダルを開く処理
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const onOpenPostModal = () => {
    setIsPostModalOpen(true);
  };

  return <HeaderView onOpenPostModal={onOpenPostModal} />;
}

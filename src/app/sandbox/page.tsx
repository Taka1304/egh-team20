"use client";
import { Header } from "@/app/_features/Navigate/Header/Header";
import { NotificationModal } from "@/app/_features/Notification/Notification";

export default function page() {
  return (
    <>
      <Header />
      <NotificationModal onClose={() => {}} />
    </>
  );
}

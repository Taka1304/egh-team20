"use client";
import { TweetModal } from "@/app/_features/Modal/TweetModal";
import { Header } from "@/app/_features/Navigate/Header/Header";

export default function page() {
  return (
    <>
      <Header />
      <TweetModal onClose={() => {}} />
    </>
  );
}

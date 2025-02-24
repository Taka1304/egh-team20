"use client";
import { ReportModal } from "@/app/_features/Modal/ReportModal";
import { Header } from "@/app/_features/Navigate/Header/Header";

export default function page() {
  return (
    <>
      <Header />
      <ReportModal onClose={() => {}} />
    </>
  );
}

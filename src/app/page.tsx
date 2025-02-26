import Header from "@/app/_features/Navigate/Header/Header";
import { Timeline } from "@/app/_features/Timeline/Timeline";

export default function Home() {
  return (
    <div className="bg-background">
      <Header />
      <div className="pt-20 h-screen w-screen p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Timeline />
        </div>
      </div>
    </div>
  );
}

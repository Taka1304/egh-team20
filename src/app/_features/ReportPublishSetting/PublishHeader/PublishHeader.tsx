import { Button } from "@/components/ui/button";

export function PublishHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b z-50 flex items-center justify-between px-4">
      <Button className="bg-white text-black border">キャンセル</Button>
      <Button>投稿する</Button>
    </header>
  );
}

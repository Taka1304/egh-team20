"use client";

import { useReportEditor } from "@/app/hooks/useReportEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FileText, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type PostCreationButtonProps = {
  className?: string;
};

export function PostCreationButton({ className }: PostCreationButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { drafts, fetchDrafts } = useReportEditor();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleNewPost = () => {
    router.push("/reports/new");
    setIsOpen(false);
  };

  const handleEditDraft = (draftId: string) => {
    router.push(`/reports/new?id=${draftId}`);
    setIsOpen(false);
  };

  // 外側をクリックしたときにドロップダウンを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ドロップダウンが開かれたときに下書き一覧を取得
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetchDrafts().finally(() => setIsLoading(false));
    }
  }, [isOpen, fetchDrafts]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Button onClick={() => setIsOpen(!isOpen)} className="bg-primary hover:bg-primary/90">
          投稿する
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 bg-card border rounded-lg shadow-lg p-4 w-[320px] z-50"
          >
            <div className="grid gap-4">
              <Button onClick={handleNewPost} className="justify-start bg-primary text-primary-foreground">
                <PlusCircle className="mr-2 h-4 w-4" />
                新しい投稿を作成
              </Button>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-primary-foreground">下書き</h3>

                {isLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : drafts.length === 0 ? (
                  <Card className="bg-background/50">
                    <CardContent className="p-3 text-center text-sm text-muted-foreground">
                      下書きはありません
                    </CardContent>
                  </Card>
                ) : (
                  <div className="max-h-[240px] overflow-y-auto space-y-2">
                    {drafts.map((draft) => (
                      <motion.div key={draft.id} whileHover={{ scale: 0.99 }} whileTap={{ scale: 0.99 }}>
                        <Card className="hover:bg-accent transition-colors">
                          <CardContent className="p-3">
                            <Button
                              variant="ghost"
                              className="w-full justify-between p-1 h-auto"
                              onClick={() => handleEditDraft(draft.id)}
                            >
                              <div className="flex items-start gap-2 text-left">
                                <FileText className="h-4 w-4 mt-1 flex-shrink-0" />
                                <div>
                                  <p className="font-medium line-clamp-1">{draft.title || "無題の文書"}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(draft.updatedAt), { addSuffix: true, locale: ja })}
                                  </p>
                                </div>
                              </div>
                              <ArrowRight className="h-4 w-4 flex-shrink-0 ml-2" />
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}

                {drafts.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-muted-foreground hover:text-primary mt-2"
                    onClick={() => {
                      router.push("/reports/drafts");
                      setIsOpen(false);
                    }}
                  >
                    すべての下書きを表示
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export function ReportDeleteDialog({ isOpen, onClose, onConfirm, title }: DeleteConfirmationDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex text-center items-center text-primary-foreground">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <AlertTriangle className="w-5 h-5 text-destructive mt-[3px] mr-2" />
                </motion.div>
                日報を削除しますか？
              </DialogTitle>
              <DialogDescription>この操作は取り消せません。本当に「{title}」を削除しますか？</DialogDescription>
            </DialogHeader>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
              <DialogFooter className="sm:justify-start">
                <Button type="button" variant="destructive" onClick={handleConfirm} disabled={isDeleting}>
                  {isDeleting ? "削除中..." : "削除する"}
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  キャンセル
                </Button>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

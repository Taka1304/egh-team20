"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type ReportPublishConfirmDialogProps = {
  onConfirm: () => void;
  disabled?: boolean;
};

export function ReportPublishConfirmDialog({ onConfirm, disabled }: ReportPublishConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-card text-foreground border" disabled={disabled}>
          公開する
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary-foreground">確認</AlertDialogTitle>
          <AlertDialogDescription>日報を公開します。よろしいですか？</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-primary-foreground">キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="hover:scale-95 duration-100">
            公開する
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

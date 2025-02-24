import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Loader2, X } from "lucide-react";

export type AIReviewResult = {
  analysisSections: {
    configuration: string;
    fulfilling: string;
    comprehensive: string[];
  };
  score: number;
  comment: string;
};

type AIReviewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result?: AIReviewResult;
};

export function AIReviewDialog({ open, onOpenChange, result }: AIReviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
        <div className="sr-only">
          <DialogTitle>AI添削結果</DialogTitle>
        </div>
        <div className="relative">
          {/* 背景 */}
          <div className="absolute inset-0 opacity-0" />

          {/* Content */}
          <div className="relative bg-black/90 p-8 mx-auto mt-20 max-w-3xl border-2 border-white transform -rotate-1">
            <Button variant="ghost" className="absolute right-2 top-2 text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>

            {/* Title */}
            <div className="relative mb-6">
              <div className="absolute -top-12 left-0 w-48 h-12 bg-red-600 transform -rotate-3">
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white">
                  AI添削結果
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="text-white space-y-6">
              <div className="loading-section">
                {result ? (
                  <>
                    <p className="text-xl mb-4">あなたの日報を分析した結果をお伝えします。</p>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-red-500 font-bold mb-2">構成評価</h3>
                        <p>{result.analysisSections.configuration}</p>
                      </div>
                      <div>
                        <h3 className="text-red-500 font-bold mb-2">内容の充実度</h3>
                        <p>{result.analysisSections.fulfilling}</p>
                      </div>
                      <div>
                        <h3 className="text-red-500 font-bold mb-2">改善のヒント</h3>
                        <ul className="list-disc list-inside space-y-2">
                          {result.analysisSections.comprehensive.map((hint) => (
                            <li key={hint}>{hint}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-red-500 font-bold mb-2">総合評価</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold">{result.score}</span>
                          <span className="text-sm text-gray-400">/ 10.0</span>
                        </div>
                        <p className="mt-2">{result.comment}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-40">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

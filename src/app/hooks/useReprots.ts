import type { Report } from "@/app/types/reports";
import { useEffect, useState } from "react";

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // ダミーデータ（実際は API コールに置き換え可能）
    const dummyReports: Report[] = [
      {
        id: 1,
        user: {
          name: "ヤマモト",
          handle: "@yamamotoVn",
          avatar: "/avatar.jpg",
        },
        content: `## 今日の気分: 😃

## 今日の出来事・作業内容
- 朝会でチームの進捗共有
- 新機能の実装に向けた設計レビュー
- バグ修正とコードレビュー対応
- クライアントとの定例ミーティング

## 明日の予定・タスク
- 実装作業の継続（API連携部分）
- ユーザーテストの準備
- 週次レポートの作成
- チームミーティングで課題共有

## 気づき・学ぶ
- コードの可読性を上げるためのリファクタリングの重要性を再認識
- クライアントの要望を整理し、優先順位を明確にすることがプロジェクトの成功に直結する

## ひとこと
今日は集中して作業できたので充実した一日だった！明日も頑張ろう！
`,
        createdAt: "2024/02/23",
        link: "https://note.com/yamamotokoki/n...",
      },
      {
        id: 2,
        user: {
          name: "ヤマモト",
          handle: "@yamamotoVn",
          avatar: "/avatar.jpg",
        },
        content: `## 今日の気分: 😃

## 今日の出来事・作業内容
- 朝会でチームの進捗共有
- 新機能の実装に向けた設計レビュー
- バグ修正とコードレビュー対応
- クライアントとの定例ミーティング

## 明日の予定・タスク
- 実装作業の継続（API連携部分）
- ユーザーテストの準備
- 週次レポートの作成
- チームミーティングで課題共有

## 気づき・学ぶ
- コードの可読性を上げるためのリファクタリングの重要性を再認識
- クライアントの要望を整理し、優先順位を明確にすることがプロジェクトの成功に直結する

## ひとこと
今日は集中して作業できたので充実した一日だった！明日も頑張ろう！
`,
        createdAt: "2024/02/22",
      },
    ];

    // 非同期処理を模擬的に
    setTimeout(() => {
      setReports(dummyReports);
      setIsLoading(false);
    }, 500);
  }, []);

  return { reports, isLoading, error };
}

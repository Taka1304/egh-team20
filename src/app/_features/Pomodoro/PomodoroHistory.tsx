"use client";

import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock } from "lucide-react";

// モックデータ
const historyData = [
  {
    id: 1,
    date: "2024-05-01",
    startTime: "10:00",
    duration: 25,
    type: "作業",
  },
  {
    id: 2,
    date: "2024-05-01",
    startTime: "10:30",
    duration: 5,
    type: "休憩",
  },
  {
    id: 3,
    date: "2024-05-01",
    startTime: "10:35",
    duration: 25,
    type: "作業",
  },
];

export function PomodoroHistory() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">セッション履歴</h2>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>日付</TableHead>
                <TableHead>開始時間</TableHead>
                <TableHead>時間 (分)</TableHead>
                <TableHead>タイプ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historyData.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {session.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {session.startTime}
                    </div>
                  </TableCell>
                  <TableCell>{session.duration}分</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        session.type === "作業" ? "bg-primary/10 text-primary" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {session.type}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}

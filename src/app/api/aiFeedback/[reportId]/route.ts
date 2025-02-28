import { geminiRun } from "@/app/api/aiFeedback/[reportId]/geminiRun";
import { prisma } from "@/lib/prisma";

import dayjs from "dayjs";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { reportId: string } }) {
  const DAILY_FEEDBACK_LIMIT = 3;
  const reportId = params.reportId;

  try {
    const report = await prisma.dailyReport.findUnique({
      where: { id: reportId },
      select: { id: true, title: true, text: true, userId: true },
    });
    if (!report) {
      return NextResponse.json({ error: "Reportがありません" }, { status: 404 });
    }

    const startOfDay = dayjs().startOf("day").toDate();
    const endOfDay = dayjs().endOf("day").toDate();
    const feedbackCount = await prisma.aIFeedback.count({
      where: {
        report: { userId: report.userId },
        createdAt: { gte: startOfDay, lte: endOfDay },
      },
    });

    if (feedbackCount >= DAILY_FEEDBACK_LIMIT) {
      return NextResponse.json({ error: "AIフィードバックの上限に達しました（上限1日3回）" }, { status: 400 });
    }

    const { responseJson, responseText } = await geminiRun(report.title, report.text);
    await prisma.aIFeedback.create({
      data: {
        reportId: report.id,
        sentiment: "まだ実装されていません",
        feedbackText: responseText,
      },
    });
    return NextResponse.json({
      message: "success",
      feedbackCount: feedbackCount + 1,
      responseJson,
    });
  } catch (error) {
    console.error("AIフィードバックの生成中にエラーが発生しました:", error);
    return NextResponse.json({ error: "AIフィードバックの生成中にエラーが発生しました" }, { status: 500 });
  }
}

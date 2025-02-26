"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="relative h-64">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <motion.svg viewBox="0 0 400 200" className="w-full h-full" initial="hidden" animate="visible">
            <motion.text
              x="200"
              y="150"
              className="text-9xl font-bold fill-primary"
              textAnchor="middle"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              500
            </motion.text>

            {[
              { cx: 160, cy: 60, r: 25, rotate: 1 },
              { cx: 200, cy: 90, r: 20, rotate: -1 },
              { cx: 240, cy: 60, r: 25, rotate: 1 },
            ].map((gear, i) => (
              <motion.g key={gear.cx}>
                <motion.circle
                  cx={gear.cx}
                  cy={gear.cy}
                  r={gear.r}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-primary"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                />
                {[...Array(8)].map((_, j) => (
                  <motion.line
                    key={_}
                    x1={gear.cx}
                    y1={gear.cy}
                    x2={gear.cx + Math.cos((j * Math.PI) / 4) * gear.r}
                    y2={gear.cy + Math.sin((j * Math.PI) / 4) * gear.r}
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-primary"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.2 }}
                  />
                ))}
                <motion.circle
                  cx={gear.cx}
                  cy={gear.cy}
                  r={gear.r - 15}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-primary"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: gear.rotate * 360 }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </motion.g>
            ))}

            {[...Array(5)].map((_, i) => (
              <motion.circle
                key={_}
                cx={160 + Math.random() * 80}
                cy={60 + Math.random() * 40}
                r="2"
                className="fill-primary"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [-10, -30],
                }}
                transition={{
                  duration: 1,
                  delay: 1.5 + i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 2,
                }}
              />
            ))}
          </motion.svg>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary-foreground">サーバーエラーが発生しました</h1>
          <p className="text-muted-foreground">
            申し訳ありません。サーバーで問題が発生しました。時間をおいて再度お試しください。
          </p>
        </div>

        <div className="space-x-4">
          <Button asChild size="lg">
            <Link href="/">ホームに戻る</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

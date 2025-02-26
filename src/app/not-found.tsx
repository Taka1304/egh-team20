"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="relative h-64">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <motion.svg viewBox="0 0 400 200" className="w-full h-full" initial="hidden" animate="visible">
            {/* 404 Text */}
            <motion.text
              x="200"
              y="150"
              className="text-9xl font-bold fill-primary"
              textAnchor="middle"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              404
            </motion.text>

            <motion.g
              initial={{ scale: 0, x: -100, y: -100 }}
              animate={{ scale: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.circle
                cx="180"
                cy="80"
                r="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-primary"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              <motion.line
                x1="200"
                y1="100"
                x2="220"
                y2="120"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="text-primary"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              />
            </motion.g>

            {[0, 1, 2].map((i) => (
              <motion.text
                key={i}
                x={240 + i * 30}
                y={70 - i * 10}
                className="text-2xl fill-primary/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0, 1, 0], y: [-20, -40, -60] }}
                transition={{
                  duration: 2,
                  delay: 1.5 + i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 2,
                }}
              >
                ?
              </motion.text>
            ))}
          </motion.svg>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary-foreground">ページが見つかりません</h1>
          <p className="text-muted-foreground">
            申し訳ありません。お探しのページは存在しないか、移動した可能性があります。
          </p>
        </div>

        <Button asChild size="lg">
          <Link href="/">ホームに戻る</Link>
        </Button>
      </div>
    </div>
  );
}

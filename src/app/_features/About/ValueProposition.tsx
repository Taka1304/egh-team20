"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { CheckCircle2, Repeat2, Users2 } from "lucide-react";

export default function ValueProposition() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
              アプリケーションの目的・価値
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              私たちのサービスが提供する3つの主要な価値について詳しくご紹介します
            </p>
          </div>
        </motion.div>

        <div className="mt-12">
          <Tabs defaultValue="habit" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="habit"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Repeat2 className="mr-2 h-4 w-4 " />
                習慣化・継続化
              </TabsTrigger>
              <TabsTrigger
                value="community"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Users2 className="mr-2 h-4 w-4" />
                コミュニティ
              </TabsTrigger>
              <TabsTrigger
                value="growth"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                自己成長
              </TabsTrigger>
            </TabsList>
            <TabsContent value="habit" className="mt-6 rounded-lg border p-6">
              <motion.div
                className="grid gap-6 md:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <h3 className="text-2xl font-bold text-primary">習慣化・継続化のサポート</h3>
                  <ul className="mt-4 space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>日報・学習ログ機能で記録を簡単にし、継続を可視化</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>目標設定や進捗グラフでモチベーションを維持</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>継続日数のカウントやストリーク機能</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>リマインダー機能で学習の習慣化をサポート</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-[300px] w-[300px]">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 49 }).map((_, i) => (
                          <motion.div
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            key={i}
                            className="h-8 w-8 rounded-sm"
                            style={{
                              backgroundColor: `hsl(${120 + Math.floor(Math.random() * 60)}, ${50 + Math.floor(Math.random() * 30)}%, ${40 + Math.floor(Math.random() * 30)}%, ${Math.random() > 0.5 ? 0.8 : 0.2})`,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.01, duration: 0.5 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            <TabsContent value="community" className="mt-6 rounded-lg border p-6 w-full">
              <motion.div
                className="grid gap-6 md:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <h3 className="text-2xl font-bold text-primary">コミュニティによる孤独感の解消・刺激</h3>
                  <ul className="mt-4 space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>同じ分野・目標を持つユーザーと繋がり、日報やリアクションで交流</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>必要に応じて「壁打ち」マッチングや1on1コミュニケーションを提供</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>テーマ別のグループディスカッションやイベント</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>質問・回答機能でお互いの知見を共有</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-[300px] w-[300px]">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-xl" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="grid grid-flow-col grid-rows-3 gap-4"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {Array.from({ length: 9 }).map((_, i) => (
                          <motion.div
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            key={i}
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-lg"
                            initial={{ x: 0, y: 0 }}
                            animate={{
                              x: Math.random() * 20 - 10,
                              y: Math.random() * 20 - 10,
                            }}
                            transition={{
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                              duration: 2 + Math.random() * 2,
                            }}
                          >
                            <span className="text-2xl">
                              {["👨‍💻", "👩‍🎨", "📚", "💼", "🎓", "🖌️", "📊", "💡", "🔍"][i]}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            <TabsContent value="growth" className="mt-6 rounded-lg border p-6">
              <motion.div
                className="grid gap-6 md:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <h3 className="text-2xl font-bold text-primary">自己成長の可視化・振り返り</h3>
                  <ul className="mt-4 space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>過去の記録や成長の推移を可視化</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>ヒートマップによる学習可視化機能を提供</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>おすすめの記事のレコメンド</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>AI分析による学習パターンや効果的な方法の提案</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-[300px] w-[300px]">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-foreground to-foreground opacity-70 blur-xl" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg viewBox="0 0 300 200" className="w-full" aria-hidden="true">
                          <motion.path
                            d="M0,150 C50,120 100,180 150,100 C200,20 250,80 300,50"
                            fill="none"
                            stroke="var(--chart-1)"
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                          />
                          <motion.g>
                            {[0, 50, 100, 150, 200, 250, 300].map((x, i) => (
                              <motion.circle
                                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                key={i}
                                cx={x}
                                cy={i % 2 === 0 ? 150 - i * 10 : 150 + i * 5}
                                r="5"
                                fill="var(--chart-1)"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                              />
                            ))}
                          </motion.g>
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

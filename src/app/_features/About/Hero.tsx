"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-48">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                成長を記録し、
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  仲間と共に歩む
                </span>
                <br />
                学びのコミュニティ
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                個人の学習と成長を記録しながら、同じ志を持つ仲間と繋がり、
                孤独感を解消し、自己成長を可視化し、継続的な学習をサポートします。
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <Button size="lg" className="group" onClick={() => signIn()}>
                始めてみる
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary to-secondary opacity-80" />
              <div className="absolute inset-6 rounded-full bg-background" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <motion.div
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      key={i}
                      className="h-4 w-4 rounded-sm bg-muted"
                      initial={{ opacity: 0.1 }}
                      animate={{
                        opacity: Math.random() > 0.5 ? 0.8 : 0.2,
                        backgroundColor: Math.random() > 0.7 ? "var(--primary)" : "var(--muted)",
                      }}
                      transition={{
                        delay: i * 0.01,
                        duration: 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        repeatDelay: Math.random() * 5,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

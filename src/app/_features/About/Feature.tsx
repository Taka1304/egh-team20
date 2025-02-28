"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";

export default function CallToAction() {
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
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary to-secondary blur-lg opacity-25" />
            <div className="relative rounded-lg border bg-background p-16 md:p-20">
              <div className="mx-auto max-w-[1000px] space-y-10">
                <h2
                  id="features"
                  className="text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  あなたの学びと成長を、
                  <br />
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    仲間と共に加速させましょう
                  </span>
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  日々の小さな一歩が、大きな成長につながります。
                  <br />
                  今日から、あなたの学びを記録し、共有してみませんか？
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <Button size="lg" className="group" onClick={() => signIn()}>
                    無料で始める
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  {/* <Button variant="outline" size="lg">
                    デモを見る
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

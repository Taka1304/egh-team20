"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { User } from "lucide-react";

const personas = [
  {
    name: "田中 健太",
    role: "Webエンジニア",
    age: 28,
    avatar: "/placeholder.svg?height=100&width=100",
    badges: ["プログラミング", "キャリアアップ", "副業"],
    description: "日々の学習を記録し、同じ技術スタックを持つ仲間と知見を共有したい。",
  },
  {
    name: "佐藤 美咲",
    role: "イラストレーター",
    age: 25,
    avatar: "/placeholder.svg?height=100&width=100",
    badges: ["デザイン", "クリエイティブ", "フリーランス"],
    description: "作品制作の過程を記録し、他のクリエイターからフィードバックを得たい。",
  },
  {
    name: "鈴木 大輔",
    role: "マーケター",
    age: 32,
    avatar: "/placeholder.svg?height=100&width=100",
    badges: ["マーケティング", "ビジネス", "自己啓発"],
    description: "読書や学びを記録し、同じ志を持つビジネスパーソンと交流したい。",
  },
];

export default function TargetAudience() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">対象ユーザー</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              学生から社会人、フリーランス、副業志向のビジネスパーソンを中心に、
              様々な分野で学びと成長を求める方々にご利用いただいています。
            </p>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.name}
              className="flex flex-col items-center rounded-lg bg-background p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Avatar className="h-24 w-24 border-4 border-primary/10">
                <AvatarImage src={persona.avatar} alt={persona.name} />
                <AvatarFallback>
                  <User className="h-12 w-12 text-foreground" />
                </AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-xl font-bold text-primary">{persona.name}</h3>
              <div className="text-sm text-muted-foreground">
                {persona.role} / {persona.age}歳
              </div>
              <div className="my-3 flex flex-wrap gap-2 justify-center">
                {persona.badges.map((badge) => (
                  <Badge key={badge} variant="secondary">
                    {badge}
                  </Badge>
                ))}
              </div>
              <p className="text-center text-muted-foreground">{persona.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

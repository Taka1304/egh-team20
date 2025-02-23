import { Github } from "@/components/Icons/github";
import { Google } from "@/components/Icons/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import type React from "react";

type LoginPageViewProps = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onLogin: (e: React.FormEvent) => void;
};

export function LoginView({ email, setEmail, password, setPassword, onLogin }: LoginPageViewProps) {
  return (
    <div className="min-h-screen bg-colorTheme-purple-tertiary flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center text-colorTheme-purple-primary mb-6">ログイン</h1>
        <form onSubmit={onLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:border-colorTheme-purple-primary focus:ring-colorTheme-purple-primary"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:border-colorTheme-purple-primary focus:ring-colorTheme-purple-primary"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-colorTheme-purple-primary hover:bg-colorTheme-purple-primary/80">
            ログイン
          </Button>
        </form>

        {/* Google & GitHub ログイン */}
        <div className="my-4 text-center text-gray-500">または</div>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-100"
            onClick={() => {}}
          >
            <Google className="h-5 w-5" />
            <span>Googleでログイン</span>
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-100"
            onClick={() => {}}
          >
            <Github className="h-5 w-5" />
            <span>GitHubでログイン</span>
          </Button>
        </div>

        <div className="mt-4 text-center">
          <Link href="/signup" className="text-colorTheme-purple-primary hover:underline">
            アカウントをお持ちでない方はこちら
          </Link>
        </div>
      </div>
    </div>
  );
}

import { Github } from "@/components/Icons/github";
import { Google } from "@/components/Icons/google";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

export function LoginView() {
  return (
    <div className="min-h-screen bg-colorTheme-purple-tertiary flex items-center justify-center">
      <div className="bg-background p-8 rounded-lg shadow-md w-96 text-foreground hover:text-secondary">
        <h1 className="text-2xl font-bold text-center text-colorTheme-purple-primary mb-6">ログイン</h1>

        {/* Google & GitHub ログイン */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 border-muted-foreground focus:border-primary"
            onClick={() => signIn("google")}
          >
            <Google className="h-5 w-5" />
            <span>Googleでログイン</span>
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 border-muted-foreground focus:border-primary"
            onClick={() => signIn("github")}
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

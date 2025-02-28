import { Github } from "@/components/Icons/github";
import { Google } from "@/components/Icons/google";
import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export function LoginView() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? env.NEXT_PUBLIC_APP_URL;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96 z-50"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl font-bold text-center flex flex-col items-center gap-4 text-gray-800 dark:text-gray-200 mb-6"
        >
          <Image src="/images/login-image.svg" alt="login-image" width={100} height={100} />
          ログイン
        </motion.h1>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
              onClick={() => signIn("google", { callbackUrl })}
            >
              <Google className="h-5 w-5" />
              <span>Googleでログイン</span>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
              onClick={() => signIn("github", { callbackUrl })}
            >
              <Github className="h-5 w-5" />
              <span>GitHubでログイン</span>
            </Button>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400"
        >
          アカウントをお持ちでない方は、上記のサービスで新規登録できます。
        </motion.p>
      </motion.div>
    </div>
  );
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Hash, ArrowLeft, Send, Users, ChevronDown, Menu } from "lucide-react"

// モックデータ
const thread = {
  id: "1",
  title: "Next.jsの使い方について",
  content: "Next.jsでアプリを作っていますが、App Routerの使い方がわかりません。誰か教えてください。",
  authorId: "1",
  authorName: "山田太郎",
  authorImage: "/placeholder.svg?height=40&width=40",
  createdAt: "2024-02-25T10:30:00Z",
  commentsCount: 5,
  communityId: "1",
  communityName: "プログラミング学習",
}

const comments = [
  {
    id: "1",
    content:
      "App Routerは、ファイルベースのルーティングを提供しています。app/ディレクトリ内にpage.tsxファイルを作成すると、そのパスでアクセスできるようになります。",
    authorId: "2",
    authorName: "佐藤花子",
    authorImage: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-02-25T11:15:00Z",
  },
  {
    id: "2",
    content:
      "また、layout.tsxを使うことで、複数のページで共通のレイアウトを定義することができます。これはネストされたルートでも使えるので便利です。",
    authorId: "3",
    authorName: "鈴木一郎",
    authorImage: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-02-25T12:30:00Z",
  },
  {
    id: "3",
    content: "公式ドキュメントがとても充実しているので、一度目を通してみることをお勧めします。https://nextjs.org/docs",
    authorId: "4",
    authorName: "高橋次郎",
    authorImage: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-02-25T14:45:00Z",
  },
]

const members = [
  { id: "1", name: "山田太郎", image: "/placeholder.svg?height=40&width=40", role: "ADMIN" },
  { id: "2", name: "佐藤花子", image: "/placeholder.svg?height=40&width=40", role: "MEMBER" },
  { id: "3", name: "鈴木一郎", image: "/placeholder.svg?height=40&width=40", role: "MEMBER" },
  { id: "4", name: "高橋次郎", image: "/placeholder.svg?height=40&width=40", role: "MEMBER" },
  { id: "5", name: "田中三郎", image: "/placeholder.svg?height=40&width=40", role: "MEMBER" },
]

export default function ThreadPage({ params }: { params: { communityId: string; threadId: string } }) {
  const [newComment, setNewComment] = useState("")
  const [showMembers, setShowMembers] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const router = useRouter()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // ここでコメント送信のロジックを実装
      console.log("コメント送信:", newComment)
      setNewComment("")
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* モバイルメニューボタン */}
      <div className="md:hidden fixed top-0 left-0 z-50 p-4">
        <Button variant="ghost" size="icon" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* コミュニティサイドバー - モバイルでは非表示 */}
      <div
        className={`${
          showMobileMenu ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative z-40 w-64 h-full bg-card border-r transition-transform duration-200 ease-in-out`}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">コミュニティ</h2>
        </div>
        <button
          type="button"
          className="p-4 hover:bg-accent/50 cursor-pointer text-left w-full flex items-center"
          onClick={() => router.push("/communities")}
        >
          <Hash className="mr-2 h-5 w-5" />
          <span>{thread.communityName}</span>
        </button>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* スレッドヘッダー */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/communities")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold truncate">{thread.title}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setShowMembers(!showMembers)}>
              <Users className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* スレッド内容とメンバー一覧 */}
        <div className="flex flex-1 overflow-hidden">
          {/* スレッド内容とコメント */}
          <div className={`flex-1 flex flex-col ${showMembers ? "hidden md:flex" : ""}`}>
            <ScrollArea className="flex-1">
              <div className="p-4">
                {/* スレッド本文 */}
                <div className="border rounded-lg p-4 bg-card mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={thread.authorImage} alt={thread.authorName} />
                      <AvatarFallback>{thread.authorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{thread.authorName}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(thread.createdAt)}</p>
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap">{thread.content}</p>
                </div>

                <Separator className="my-4" />

                {/* コメント一覧 */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border rounded-lg p-4 bg-card">
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.authorImage} alt={comment.authorName} />
                          <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{comment.authorName}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</p>
                        </div>
                      </div>
                      <p className="whitespace-pre-wrap">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>

            {/* コメント入力エリア */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Textarea
                  placeholder="コメントを入力..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 min-h-[80px]"
                />
                <Button className="self-end" onClick={handleSubmitComment} disabled={!newComment.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  送信
                </Button>
              </div>
            </div>
          </div>

          {/* メンバー一覧 */}
          <div className={`${showMembers ? "block" : "hidden md:hidden"} md:block w-full md:w-64 border-l bg-card`}>
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">メンバー</h2>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowMembers(false)}>
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-180px)]">
              <div className="p-2">
                <div className="mb-2 px-2">
                  <p className="text-xs font-semibold text-muted-foreground">管理者 - 1</p>
                </div>
                {members
                  .filter((m) => m.role === "ADMIN")
                  .map((member) => (
                    <div key={member.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent/50">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                    </div>
                  ))}
                <Separator className="my-2" />
                <div className="mb-2 px-2">
                  <p className="text-xs font-semibold text-muted-foreground">
                    メンバー - {members.filter((m) => m.role === "MEMBER").length}
                  </p>
                </div>
                {members
                  .filter((m) => m.role === "MEMBER")
                  .map((member) => (
                    <div key={member.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent/50">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}


import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function TodoCard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: crypto.randomUUID(),
          text: newTodo.trim(),
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-sm font-semibold">タスク</h2>
      <form onSubmit={handleAddTodo} className="flex gap-2">
        <Input placeholder="新しいタスクを追加" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <Button type="submit" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </form>
      <div className="space-y-2">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleToggleTodo(todo.id)}
              className={todo.completed ? "text-primary" : ""}
            >
              <Check className="h-4 w-4" />
            </Button>
            <span className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : ""}`}>{todo.text}</span>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleDeleteTodo(todo.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

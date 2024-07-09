"use client";

import { Session } from "next-auth";
import { useEffect, useState } from "react";
import Card from "./card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface Todo {
  _id: string;
  title: string;
  description: string;
  isImportant: boolean;
  date: number;
  isDone: boolean;
}

export default function Feed(session: Session) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const fetchTodos = async () => {
      //@ts-ignore
      const res = await fetch(`/api/todos/user/${session?.user?.id.toString()}`);
      const data = await res.json();

      if (filter === "completed") {
        const completed = data.filter((todo: Todo) => todo.isDone);
        setTodos(completed);
        return;
      }
      if (filter === "important") {
        const important = data.filter((todo: Todo) => todo.isImportant);
        setTodos(important);
        return;
      }
      setTodos(data);
    };
    fetchTodos();
  }, [session, filter]);

  const handleComplete = async (id: string) => {
    console.log(id);
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "GET",
      });
      if (response.ok) {
        const todo = await response.json();
        todo.isDone = !todo.isDone;
        await fetch(`/api/todos/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
            title: todo.title,
            description: todo.description,
            isImportant: todo.isImportant,
            date: todo.date,
            isDone: todo.isDone,
          }),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex gap-4 mb-6">
        <button
          className={cn(
            "rounded-md px-3 py-2 inline-flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 hover:opacity-90 active:opacity-90 transition-colors duration-200",
            filter === "all"
              ? "bg-zinc-950 text-zinc-100 dark:bg-zinc-50 dark:text-zinc-950"
              : ""
          )}
          onClick={() => setFilter("all")}
        >
          <span className="text-xs font-semibold">All</span>
        </button>
        <button
          className={cn(
            "rounded-md px-3 py-2 inline-flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 hover:opacity-90 active:opacity-90 transition-colors duration-200",
            filter === "completed"
              ? "bg-zinc-950 text-zinc-100 dark:bg-zinc-50 dark:text-zinc-950"
              : ""
          )}
          onClick={() => setFilter("completed")}
        >
          <span className="text-xs font-semibold">Completed</span>
        </button>
        <button
          className={cn(
            "rounded-md px-3 py-2 inline-flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 hover:opacity-90 active:opacity-90 transition-colors duration-200",
            filter === "important"
              ? "bg-zinc-950 text-zinc-100 dark:bg-zinc-50 dark:text-zinc-950"
              : ""
          )}
          onClick={() => setFilter("important")}
        >
          <span className="text-xs font-semibold">Important</span>
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {todos.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-zinc-500 dark:text-zinc-500">No todos found!</p>
          </div>
        )}
        {todos.map((todo: Todo) => (
          <Card key={todo._id} data={todo} />
        ))}
      </div>
    </>
  );
}

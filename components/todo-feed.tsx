"use client";

import { useState, useEffect } from "react";

import { PlusCircleIcon } from "@heroicons/react/24/outline";

import ToDoCard from "./todo-card";
import Link from "next/link";

interface Todo {
  title: string;
  description: string;
  isImportant: boolean;
  date: string;
}

const ToDoCardList = ({ data }: { data: Todo[] }) => {
  return (
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-4 ">
      <Link
        href="/create-todo"
        className="max-w-screen-sm w-full hidden sm:block mx-auto rounded-lg"
      >
        <div className="w-full bg-neutral-800 h-48 p-2 rounded-lg">
          <div className="w-full h-full border-2 border-dashed rounded-sm border-neutral-600 flex items-center justify-center">
            <PlusCircleIcon className="h-16 w-16 text-neutral-500 dark:text-neutral-600 " />
          </div>
        </div>
      </Link>
      {data.map((todo) => (
        <ToDoCard
          title={todo.title}
          description={todo.description}
          isImportant={todo.isImportant}
          date={todo.date.split("T")[0]}
        />
      ))}
    </div>
  );
};

export default function ToDoFeed() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("/api/todos");
      const data = await res.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);
  return <ToDoCardList data={todos} />;
}

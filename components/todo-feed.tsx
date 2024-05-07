"use client";

import { useState, useEffect } from "react";

import { PlusCircleIcon } from "@heroicons/react/24/outline";

import ToDoCard from "./todo-card";
import Link from "next/link";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

interface Todo {
  title: string;
  description: string;
  isImportant: boolean;
  date: string;
  isDone: boolean;
}

const ToDoCardList = ({ data }: { data: Todo[] }) => {
  return (
      // <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-4 ">
      // <Link
      //   href="/create-todo"
      //   className="max-w-screen-sm w-full hidden sm:block mx-auto rounded-lg"
      // >
      //   <div className="w-full bg-neutral-800 h-48 p-2 rounded-lg">
      //     <div className="w-full h-full border-2 border-dashed rounded-sm border-neutral-600 flex items-center justify-center">
      //       <PlusCircleIcon className="h-16 w-16 text-neutral-500 dark:text-neutral-600 " />
      //     </div>
      //   </div>
      // </Link>
      <>
      {data.map((todo) => (
        <ToDoCard
          title={todo.title}
          description={todo.description}
          isImportant={todo.isImportant}
          date={todo.date.split("T")[0]}
          isDone={todo.isDone}
        />
      
      ))}
      </>
    // </div>
  );
};

export default function ToDoFeed(session: Session) {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const fetchTodos = async () => {
      
      //@ts-ignore
      const res = await fetch(`/api/todos/${session?.user?.id.toString()}`);
      const data = await res.json();
      setTodos(data);
    };
    fetchTodos();
  }, [session]);
  return (
    <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-4 ">
      <Link
        href="/create-todo"
        className="max-w-screen-sm w-full hidden sm:block mx-auto rounded-lg"
      >
        <div className="w-full h-48 bg-neutral-100 dark:bg-neutral-800 shadow-md p-3 rounded-lg">
          <div className="w-full h-full border-2 border-dashed rounded-sm border-neutral-400 dark:border-neutral-600  flex items-center justify-center">
            <div className="flex flex-col items-center justify-center"><PlusCircleIcon className="h-14 w-14 text-neutral-400 dark:text-neutral-600 " />
            <p className="text-xs font-light text-neutral-400 dark:text-neutral-600 pt-1">Add new To do</p></div>
          </div>
        </div>
      </Link>
  <ToDoCardList data={todos} />
  </div>
);
}

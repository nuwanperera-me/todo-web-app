"use client";

import { useState, useEffect } from "react";

import {
  PencilIcon,
  CheckCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { Session } from "next-auth";
import { cn } from "@/lib/utils";

interface Todo {
  _id: string;
  title: string;
  description: string;
  isImportant: boolean;
  date: string;
  isDone: boolean;
}

export default function ToDoFeed(session: Session) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }, data: Todo) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`/api/todos/${data._id}`, {
        method: "GET",
      });
      if (response.ok) {
        const todo = await response.json();
        console.log(todo);
        todo.isDone = !todo.isDone;
        await fetch(`/api/complete-todo/${data._id}`, {
          method: "POST",
          body: JSON.stringify({
            userId: todo.creator._id,
            title: todo.title,
            description: todo.description,
            isImportant: todo.isImportant,
            date: todo.date,
          }),
        });
        await fetch(`/api/todos/${data._id}`, {
          method: "DELETE",
          body: JSON.stringify({}),
        });
        setIsDone(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDelete = async (e: { preventDefault: () => void }, data: Todo) => {
    e.preventDefault();
  
    try {
      let response = null;
      if (data.isDone) {
        response = await fetch(`/api/complete-todo/${data._id}`, {
          method: "DELETE",
          body: JSON.stringify({ id: data._id }),
        });
      } else {
        response = await fetch(`/api/todos/${data._id}`, {
          method: "GET",
        });
      }
      if (response.ok) {
        await fetch(`/api/todos/${data._id}`, {
          method: "DELETE",
          body: JSON.stringify({}),
        });
      }
      setIsDeleted(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      //@ts-ignore
      const res = await fetch(`/api/todos/user/${session?.user?.id.toString()}`
      );
      const data = await res.json();
      setTodos(data);
    };
    fetchTodos();
  }, [session, isDone, isDeleted]);

  useEffect(() => {
    const fetchTodos = async () => {
      //@ts-ignore
      const res = await fetch(`/api/todos/user/${session?.user?.id.toString()}/completed`
      );
      const data = await res.json();
      setCompletedTodos(data);
    };
    fetchTodos();
  }, [session, isDone, isDeleted]);

  return (
    <>
      <div className="w-full flex flex-col gap-4 items-center">
        
        {todos.length === 0 ? 'No Todos available!' : todos.map((data) => (
          <div key={data._id} className="w-full flex flex-col max-w-screen-sm mx-auto p-4 justify-between  bg-neutral-200 dark:bg-neutral-800 rounded-lg shadow-md">
            <div className="flex flex-col h-full items-center gap-2 justify-between">
              <div className="h-full w-full">
                <div className=" w-full flex justify-between">
                  <h3 className="text-lg font-semibold dark:text-neutral-100">
                    {data.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      handleDelete(e, data);
                      setIsDeleted(true);
                    }}
                    className="h-8 rounded-full text-white flex items-center justify-center"
                  >
                    <TrashIcon className="h-5 w-5 dark:hover:text-red-500 hover:text-red-600 text-neutral-500 dark:text-neutral-400 transition-colors duration-300" />
                  </button>
                </div>
                <div className="text-xs pt-2 font-semibold text-zinc-900 ">
                  {data.isImportant ? (
                    <span className=" py-1 px-2 rounded-md text-neutral-50 bg-orange-400">
                      Important
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 pt-2">
                  {data.description}
                </p>
              </div>
              <div className="w-full flex items-center justify-between gap-2">
                <p className="text-xs text-neutral-400">{data.date}</p>

                <div
                  className={cn([
                    "flex gap-2 items-center",
                    data.isDone ? "hidden" : "",
                  ])}
                >
                  <Link href={`/edit-todo/${data._id}`}>
                    <PencilIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors duration-300" />
                  </Link>
                  <button
                    onClick={(e) => {
                      handleSubmit(e, data);
                      setIsDone(true);
                    }}
                    className="rounded-full bg-primary-500 text-zinc-950 dark:text-zinc-50 flex items-center justify-center "
                  >
                    <CheckCircleIcon
                      className={cn([
                        "h-6 w-6 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors duration-300",
                        data.isDone
                          ? "text-neutral-500"
                          : "text-neutral-500 hover:text-green-500 hover:dark:text-green-400",
                      ])}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 className="mt-16 text-xl font-semibold"> {completedTodos.length === 0 ? '': 'Completed Todos'}</h2>
      <div className="w-full flex flex-col gap-3 mt-4 opacity-85">
        {completedTodos.map((data) => (
          <div key={data._id} className="w-full flex flex-col max-w-screen-sm mx-auto p-4 justify-between  bg-neutral-200 dark:bg-neutral-800 rounded-lg shadow-md">
            <div className="flex flex-col h-full items-center gap-2 justify-between">
              <div className="h-full w-full">
                <div className=" w-full flex justify-between">
                  <h3 className="text-lg font-semibold dark:text-neutral-100">
                    {data.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      handleDelete(e, data);
                      setIsDeleted(true);
                    }}
                    className="h-8 rounded-full text-white flex items-center justify-center"
                  >
                    <TrashIcon className="h-5 w-5 dark:hover:text-red-500 hover:text-red-600 text-neutral-500 dark:text-neutral-400 transition-colors duration-300" />
                  </button>
                </div>
                <div className="text-xs pt-2 font-semibold text-zinc-900 ">
                  {data.isImportant ? (
                    <span className=" py-1 px-2 rounded-md text-neutral-50 bg-orange-500">
                      Important
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 pt-2">
                  {data.description}
                </p>
              </div>
              <div className="w-full flex items-center justify-between gap-2">
                <p className="text-xs text-neutral-400">{data.date}</p>

                <div
                  className={cn([
                    "flex gap-2 items-center",
                    data.isDone ? "hidden" : "",
                  ])}
                >
                  <Link href={`/edit-todo/${data._id}`}>
                    <PencilIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors duration-300" />
                  </Link>
                  <button
                    onClick={(e) => {
                      handleSubmit(e, data);
                      setIsDone(true);
                    }}
                    className="rounded-full bg-primary-500 text-zinc-950 dark:text-zinc-50 flex items-center justify-center "
                  >
                    <CheckCircleIcon
                      className={cn([
                        "h-6 w-6 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors duration-300",
                        !data.isDone
                          ? "text-neutral-500"
                          : "text-green-500 hover:text-green-400 hover:dark:text-green-400",
                      ])}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

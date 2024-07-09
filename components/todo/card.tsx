"use client";

import {
  TrashIcon,
  PencilIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Todo } from "./feed";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

type CardProps = {
  data: Todo;
};

export default function Card({ data }: CardProps) {
  const [isDone, setIsDone] = useState(data.isDone);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleComplete = async (id: string) => {
    setIsDone(!isDone);
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

  const handleDelete = async (id: string) => {
    setIsDeleted(true);
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setIsDone(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const date = new Date(data.date * 1).toLocaleDateString();

  return isDeleted ? (
    <></>
  ) : (
    <div
      key={data._id}
      className="w-full flex flex-col max-w-screen-sm mx-auto p-4 justify-between  bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-md"
    >
      <div className="flex flex-col h-full items-center gap-2 justify-between">
        <div className="h-full w-full">
          <div className=" w-full flex justify-between">
            <h3 className="text-lg font-semibold dark:text-neutral-100">
              {data.title}
            </h3>
            <button
              onClick={(e) => {
                handleDelete(data._id);
              }}
              className="h-8 rounded-full text-white flex items-center justify-center"
            >
              <TrashIcon className="h-5 w-5 dark:hover:text-red-500 hover:text-red-600 text-zinc-500 dark:text-zinc-500 transition-colors duration-300" />
            </button>
          </div>
          <div className="text-xs pt-2 font-semibold text-zinc-900 ">
            {data.isImportant ? (
              <span className=" py-1 px-2 rounded-sm text-zinc-50 bg-orange-400">
                Important
              </span>
            ) : (
              <></>
            )}
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 pt-2">
            {data.description}
          </p>
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <p className="text-xs text-zinc-400">{new Date(data.date * 1).toLocaleDateString().replaceAll("/", " / ")}</p>

          <div
            className={cn([
              "flex gap-2 items-center",
            ])}
          >
            <Link href={`/edit-todo/${data._id}`}>
              <PencilIcon className="h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:hover:text-neutral-50 transition-colors duration-300" />
            </Link>
            <button
              onClick={(e) => {
                handleComplete(data._id);
              }}
              className="rounded-full bg-primary-500 text-zinc-950 dark:text-zinc-50 flex items-center justify-center "
            >
              <CheckCircleIcon
                className={cn(
                  "h-6 w-6 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors duration-300",

                  isDone
                    ? "text-green-600"
                    : "text-zinc-500 hover:text-green-500 hover:dark:text-green-400"
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

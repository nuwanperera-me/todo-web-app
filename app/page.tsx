"use client";

import ToDoCard from "@/components/todo-card";

import { PlusCircleIcon } from "@heroicons/react/24/outline";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const todoDataArray = [
    {
      title: "Do Homework",
      description: "Todo Description",
      isImportant: true,
      date: "2021-10-10",
    },
    {
      title: "Read book",
      isImportant: true,

      date: "2021-10-10",
    },
    {
      title: "Do Homework",
      description: "Todo Description",
      isImportant: false,

      date: "2021-10-10",
    },
    {
      title: "Testing 1",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis corporis, inventore expedita eum quibusdam hic recusandae ullam magni provident ducimus vitae aspernatur. Consequatur at voluptatibus, id quidem aliquid optio rerum?Lorem ipsum dolor ",
      isImportant: false,

      date: "2021-10-10",
    },
    {
      title: "Do Homework",
      description: "Todo Description",
      isImportant: true,
      date: "2021-10-10",
    },
  ];

  const { data: session } = useSession();

  return (
    <>
      <div className="my-6">Hello {session?.user?.name}</div>
      <Link
        href="/create-todo"
        className="fixed w-14 h-14 flex sm:hidden justify-center items-center rounded-full bg-sky-600 bottom-6 right-6"
      >
        <PlusCircleIcon className="h-8 w-8 text-neutral-50" />
      </Link>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 auto-rows-max gap-4 ">
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
        {todoDataArray.map((data) => (
          <div>
            <ToDoCard
              title={data.title}
              description={data.description || ""}
              isImportant={data.isImportant}
              date={data.date}
            />
          </div>
        ))}
      </div>
    </>
  );
}

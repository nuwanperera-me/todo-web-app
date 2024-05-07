"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import { PlusCircleIcon } from "@heroicons/react/24/outline";

import ToDoFeed from "@/components/todo-feed";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-3xl font-semibold">SIGN IN TO CONTINUE</div>
      </div>
    );
  }

  return (
    <div>
      <div className="my-6 mt-10 text-3xl font-semibold">
        Hi {session ? session?.user?.name?.split(" ")[0] : "there"}! 🤗
      </div>
      <Link
        href="/create-todo"
        className="fixed w-14 h-14 flex sm:hidden justify-center items-center rounded-full bg-sky-600 bottom-6 right-6"
      >
        <PlusCircleIcon className="h-8 w-8 text-neutral-50" />
      </Link>
      <div className="max-w-screen-lg mx-auto flex items-center justify-center">
        <ToDoFeed user={session?.user} expires="" />
      </div>
    </div>
  );
}

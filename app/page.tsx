"use client";

import React, { useEffect, useState } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";

import Link from "next/link";

import ToDoFeed from "@/components/todo-feed";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    const setProvidersList = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvidersList();
  }, []);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-3xl font-semibold">Sign In to Continue</div>
        {providers &&
          Object.values(providers).map((provider: any) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="mt-4 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 transition-colors duration-200 text-sm text-zinc-50 font-semibold rounded-lg "
            >
              Sign In
            </button>
          ))}
      </div>
    );
  }

  return (
    <div className="max-w-screen-md w-full mx-auto">
      <div className="flex items-end justify-between">
        {" "}
        <div className="my-6 mt-10 text-3xl font-semibold">
          Welcome Back, {session ? session?.user?.name?.split(" ")[0] : "there"}{" "}
          👋
        </div>
        <Link
          href="/create-todo"
          className="fixed w-14 sm:w-auto h-14 sm:h-auto flex sm:relative justify-center items-center rounded-full sm:rounded-sm bg-blue-600 dark:bg-blue-500 hover:opacity-90 transition-opacity duration-200 bottom-6 right-6 z-10"
        >
          <PlusIcon className="block sm:hidden h-8 sm:h-7 w-8 sm:w-7 text-zinc-100 dark:text-zinc-50 m-2" />

          <p className="hidden sm:inline-flex items-center py-2 px-4 text-zinc-50 text-sm"> <span>
            <PlusIcon className="w-4 h-4 mr-2"/></span>Add new</p>
        </Link>
      </div>
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center mt-6">
        <ToDoFeed user={session?.user} expires="" />
      </div>
    </div>
  );
}

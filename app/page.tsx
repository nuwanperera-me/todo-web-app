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
          className="fixed w-14 sm:w-8 h-14 sm:h-8 flex sm:relative justify-center items-center rounded-full bg-emerald-600 sm:bg-zinc-300  hover:bg-emerald-500 sm:hover:bg-zinc-400 transition-colors duration-200 bottom-6 right-6"
        >
          <PlusIcon className="h-8 sm:h-5 w-8 sm:w-5 text-neutral-50 " />
        </Link>
      </div>
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center">
        <ToDoFeed user={session?.user} expires="" />
      </div>
    </div>
  );
}

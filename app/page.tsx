"use client";

import React, { useEffect, useState } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";

import Link from "next/link";

// import ToDoFeed from "@/components/todo-feed";
import { PlusIcon } from "@heroicons/react/24/outline";
import Feed from "@/components/todo/feed";
import { Loader2 } from "lucide-react";

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
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="text-3xl md:text-4xl font-semibold">
          Sign In to Continue
        </div>
        {!providers && <Loader2 className="mt-4 animate-spin text-zinc-100" />}
        {providers &&
          Object.values(providers).map((provider: any) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="h-12 flex items-center justify-center mt-4 px-6 py-2 bg-zinc-100 dark:bg-zinc-900 transition-colors duration-200 text-sm text-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:text-zinc-50 font-semibold rounded-lg "
            >
              <p className="inline-flex gap-2 items-center justify-center">
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="0.98em"
                    height="1em"
                    viewBox="0 0 256 262"
                  >
                    <path
                      fill="#4285f4"
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    />
                    <path
                      fill="#34a853"
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    />
                    <path
                      fill="#fbbc05"
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                    />
                    <path
                      fill="#eb4335"
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    />
                  </svg>
                </span>
                Sign in with google
              </p>
            </button>
          ))}
      </div>
    );
  }

  return (
    <div className="max-w-screen-sm w-full mx-auto">
      <div className="flex items-end justify-between">
        <div className="my-6 mt-10 text-4xl font-semibold">
          Hello {session ? session?.user?.name?.split(" ")[0] : "there"} 👋
        </div>
        <Link
          href="/create-todo"
          className="fixed w-14 sm:w-auto h-14 sm:h-auto flex sm:relative justify-center items-center rounded-full sm:rounded-sm bg-blue-600 dark:bg-blue-500 hover:opacity-90 transition-opacity duration-200 bottom-6 right-6 sm:top-1/2 sm:right-0 z-10"
        >
          <PlusIcon className="block sm:hidden h-8 sm:h-7 w-8 sm:w-7 text-zinc-100 dark:text-zinc-50 m-2" />

          <p className="hidden sm:inline-flex items-center py-2 px-4 text-zinc-50 text-sm">
            {" "}
            <span>
              <PlusIcon className="w-4 h-4 mr-2" />
            </span>
            Add new
          </p>
        </Link>
      </div>
      <div className="max-w-screen-lg mx-auto">
        <Feed user={session?.user} expires={session.expires} />
      </div>
    </div>
  );
}

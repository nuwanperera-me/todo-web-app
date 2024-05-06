"use client";

import * as React from "react";

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./theme-toggle";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function NavBar() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    const setProvidersList = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvidersList();
  }, []);
  return (
    <nav className="fixed w-full h-16 flex flex-col items-center backdrop-blur-sm border-b shadow-2xl shadow-neutral-800">
      <div className="w-full h-16 max-w-screen-2xl px-6 flex items-center justify-between">
        <Link href="/">
          <p className="text-2xl font-semibold select-none">TO DOx</p>
        </Link>

        <div className="inline-flex gap-4 ">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-10 h-10 rounded-full border-2 cursor-pointer border-neutral-300 dark:border-neutral-700 overflow-hidden">
                  <Image
                    src={session.user.image ?? "/image.png"}
                    width={40}
                    height={40}
                    alt="Profile"
                    placeholder="empty"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link className="w-full h-full" href="/profile">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    type="button"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                      signOut()
                    }
                    className="w-full h-full text-left"
                  >
                    Sign out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider: any) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

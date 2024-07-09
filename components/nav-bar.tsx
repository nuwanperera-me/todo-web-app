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

  const Logo = ({ className }: { className: string }) => {
    return (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13Z"
          fill="url(#paint0_linear_14_22)"
        />
        <rect
          x="4.11111"
          y="13.7962"
          width="2.88889"
          height="9.62963"
          transform="rotate(-45 4.11111 13.7962)"
          fill="#FAFAFA"
        />
        <rect
          x="20.9473"
          y="6.74072"
          width="2.88889"
          height="16.8519"
          transform="rotate(45 20.9473 6.74072)"
          fill="#FAFAFA"
        />
        <defs>
          <linearGradient
            id="paint0_linear_14_22"
            x1="13"
            y1="0"
            x2="13"
            y2="26"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.695" stop-color="#09090B" />
            <stop offset="0.88" stop-color="#27272A" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  return (
    <nav className="fixed w-full h-16 flex flex-col items-center backdrop-blur-sm border-b shadow-2xl shadow-neutral-200 dark:shadow-neutral-800 ">
      <div className="w-full h-16 max-w-screen-2xl px-8 flex items-center justify-between">
        <Link href="/" className="flex flex-col items-end">
          <p className="text-2xl inline-flex items-end font-semibold select-none">
            TODO
            <span>
              <Logo className="w-3" />
            </span>
          </p>
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
                    className="flex items-center justify-center border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-200 rounded-sm px-4"
                  >
                    <p className="text-sm">Sign In</p>
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

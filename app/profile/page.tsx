"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function Profile() {
  const { data: session, status } = useSession();
  if (status === "authenticated" && session?.user) {
    return (
      <div className="max-w-96 mt-8 mx-auto flex items-center gap-4">
        <Image
          src={session.user.image || ""}
          width={108}
          height={108}
          alt="Profile"
          className="rounded-full"
        />
        <div>
          <h1 className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
            {session.user.name}
          </h1>
          <p className=" font-semibold text-zinc-400">{session.user.email}</p>
        </div>
      </div>
    );
  } else {
    redirect("/");
  }
}

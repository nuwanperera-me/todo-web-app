'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Profile() {
  const { data: session, status } = useSession();
  if (status === "authenticated" && session?.user) {
    return (
      <div>
        <div>
          <img src={session.user.image || ""} alt="Profile" />
          <h1>{session.user.name}</h1>
          <p>{session.user.email}</p>
        </div>
      </div>
    );
  } else {
    redirect("/")
  }
}
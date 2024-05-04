"use client";

import * as React from "react";

import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function NavBar() {
  return (
    <nav className="fixed w-full h-16 flex flex-col items-center backdrop-blur-sm border-b">
      <div className="w-full h-16 max-w-screen-2xl px-6 flex items-center justify-between">
        <Link href="/">
          <div>To-Do</div>
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}

import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full m-auto flex flex-col items-center justify-center">
      <div className="inline-flex items-center">
        <h1 className="bg-clip-text bg-gradient-to-t from-zinc-300 to-zinc-100 dark:from-zinc-700 dark:to-zinc-400 text-transparent text-9xl  font-bold">
          404
        </h1>
      </div>
      <p className="text-lg max-w-96 text-center text-zinc-400 dark:text-zinc-600 pt-4">
        The page you&apos;re looking for doesn&apos;t exist. Please check the
        URL or click the button below to go back to the homepage.
      </p>
      <Link
        href="/"
        className="mt-8 px-2 py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-200"
      >
        <span className="px-2 py-1 mr-2 rounded-md border border-zinc-400 dark:border-zinc-600 bg-zinc-300 dark:bg-zinc-700">
          ./
        </span>{" "}
        Go back to the homepage.
      </Link>
    </div>
  );
}

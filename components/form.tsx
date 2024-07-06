"user client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface FormProps {
  type: string;
  post: { title: string; description: string; isImportant: boolean };
  setPost: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      isImportant: boolean;
      isDone?: boolean;
    }>
  >;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form(FormProps: FormProps) {
  const [count, setCount] = React.useState(FormProps.post.description.length);

  useEffect(() => {
    setCount(FormProps.post.description.length);
  }, [FormProps.post.description]);

  return (
    <div className="mx-auto flex flex-col max-w-lg h-auto border rounded-xl ">
      <div className="bg-zinc-100 dark:bg-neutral-900 rounded-t-xl border-b-[1px] border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex justify-between items-center mb-4">
          <ClipboardDocumentCheckIcon className="w-10 h-10 text-zinc-700 dark:text-zinc-50 p-1 rounded-md" />
          <Link
            href="/"
            className="flex items-center hover:underline underline-offset-2 "
          >
            <ChevronLeftIcon className="w-4 h-4 mr-2 text-zinc-700 dark:text-zinc-50" />
            <p className="text-zinc-700 dark:text-zinc-50 text-sm">Back</p>
          </Link>
        </ div>
        <h1 className="text-lg text-zinc-700 dark:text-zinc-50 font-medium text-left">
          {FormProps.type} todo
        </h1>
      </div>
      <form
        onSubmit={FormProps.handleSubmit}
        className="w-full flex flex-col space-y-6 p-4 mt-6 "
      >
        <div className="w-full flex items-center gap-3">
          <label htmlFor="title" className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={FormProps.post.title}
            onChange={(e) =>
              FormProps.setPost({ ...FormProps.post, title: e.target.value })
            }
            maxLength={50}
            placeholder="(Ex. : Do Homework)"
            className="w-full px-4 py-2 rounded-md text-sm focus:border-blue-500 border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <label
              htmlFor="description"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
            >
              Description
            </label>
            <p className="text-xs bg-zinc-200 text-zinc-800  dark:text-zinc-200 dark:bg-zinc-800 py-0.5 px-1 rounded-sm">
              {count} / 200{" "}
            </p>
          </div>
          <textarea
            id="description"
            value={FormProps.post.description}
            placeholder="Type description..."
            onChange={(e) => {
              FormProps.setPost({
                ...FormProps.post,
                description: e.target.value,
              });
              setCount(e.target.value.length);
            }}
            rows={4}
            maxLength={200}
            className="w-full px-4 py-2 rounded-md text-sm focus:border-blue-500 border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isImportant"
            checked={FormProps.post.isImportant}
            onChange={(e) =>
              FormProps.setPost({
                ...FormProps.post,
                isImportant: e.target.checked,
              })
            }
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded mr-3 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="isImportant"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            Important
          </label>
        </div>
        <div className="flex w-full pt-4 gap-3">
          <Link href="/" className="w-full flex items-center justify-center font-medium text-zinc-800 dark:text-zinc-200 border hover:bg-zinc-200 dark:hover:bg-zinc-800 underline-offset-2 rounded-md">
              Cancel
          </Link>
          <button
            type="submit"
            disabled={
              FormProps.submitting || FormProps.post.title.trim() === ""
            }
            className={cn([
              "w-full bg-blue-600 text-white p-2 rounded-md transition-opacity duration-200 cursor-pointer font-medium hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
              FormProps.post.title.trim() === "" ? "opacity-60" : "",
            ])}
          >
            {FormProps.type === "Create"
              ? FormProps.submitting
                ? "Creating..."
                : "Create"
              : FormProps.submitting
              ? `${FormProps.type}ing...`
              : FormProps.type}
          </button>
        </div>
      </form>
    </div>
  );
}

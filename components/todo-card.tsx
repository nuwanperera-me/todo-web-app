import React from "react";

import {
  PencilIcon,
  CheckCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export type todoData = {
  title: string;
  description?: string;
  isImportant: boolean;
  date: string;
};

export default function ToDoCard(data: todoData) {
  return (
    <div className="w-full flex flex-col max-w-screen-sm mx-auto p-4 justify-between  bg-white dark:bg-neutral-800 rounded-lg shadow-md">
      <div className="flex flex-col h-full items-center gap-2 justify-between">
        <div className="h-full w-full">
          <div className=" w-full flex justify-between">
            <h3 className="text-lg font-semibold dark:text-neutral-100">
              {data.title}
            </h3>
            <button className="h-8 rounded-full text-white flex items-center justify-center">
              <TrashIcon className="h-5 w-5 dark:hover:text-red-500 hover:text-red-600 text-neutral-500 dark:text-neutral-400 transition-colors duration-300" />
            </button>
          </div>
          <div className="text-xs pt-2 font-semibold text-zinc-900 ">
            {data.isImportant ? (
              <span className=" py-1 px-2 rounded-md text-neutral-50 bg-orange-400">
                Important
              </span>
            ) : (
              <></>
            )}
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 pt-2">
            {data.description}
          </p>
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <p className="text-xs text-neutral-400">{data.date}</p>

          <div className="flex gap-2 items-center">
            <PencilIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors duration-300" />
            <button className="rounded-full bg-primary-500 text-zinc-950 dark:text-zinc-50 flex items-center justify-center ">
              <CheckCircleIcon className="h-6 w-6 text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

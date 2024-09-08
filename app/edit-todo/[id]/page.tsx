"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Form from "@/app/components/form";

export default function EditTodoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const todoId = params.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState<{
    title: string;
    description: string;
    isImportant: boolean;
    isDone?: boolean;
  }>({
    title: "",
    description: "",
    isImportant: false,
    isDone: false,
  });

  useEffect(() => {
    const getTodoData = async () => {
      const response = await fetch(`/api/todos/${todoId}`);
      const data = await response.json();

      setPost({
        title: data.title,
        description: data.description,
        isImportant: data.isImportant,
        isDone: data.isDone,
      });
    };
    if (todoId) getTodoData();
  }, [todoId]);

  const updateTodo = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!todoId) return alert("No todo id found");

    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
          description: post.description,
          isImportant: post.isImportant,
          isDone: post.isDone,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full my-auto">
      <Form
        type={"Edit"}
        post={post}
        setPost={setPost}
        submitting={isSubmitting}
        handleSubmit={updateTodo}
      />
    </div>
  );
}

"use client";

import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Form from "@/components/form";

export default function CreateTodo() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    description: "",
    isImportant: false,
  });

  const CreateTodo = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/todos/new", {
        method: "POST",
        body: JSON.stringify({
          // @ts-ignore
          userId: session?.user?.id,
          title: post.title,
          description: post.description,
          isImportant: post.isImportant,
          date: new Date().toLocaleString().slice(0, 10).replace(/\//g, "-"),
        }),
      });
      if (response.ok) {
        setPost({
          title: "",
          description: "",
          isImportant: false,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      router.push("/");
    }
  };

  return (
    <div className="mt-10">
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={isSubmitting}
        handleSubmit={CreateTodo}
      />
    </div>
  );
}

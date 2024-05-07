"use client";

import React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Form from "@/components/form";

export default function EditTodoPage({ params }: { params: { id: string }}) {
  const router = useRouter();
  const todoId = params.id;
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    description: "",
    isImportant: false,
  });

  useEffect(() => {
    const getTodoData = async () => {
      const response = await fetch(`/api/todos/${todoId}`);
      const data = await response.json();
      
      setPost({
        title: data.title,
        description: data.description,
        isImportant: data.isImportant,
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
        body: JSON.stringify({title: post.title, description: post.description, isImportant: post.isImportant}),
      });
      
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
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

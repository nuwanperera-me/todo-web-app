import Todo from "@/models/todo";
import { connectToDatabase } from "@/lib/database";

export const GET = async (request: Request) => {
  try {
    await connectToDatabase();
    const prompts = await Todo.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

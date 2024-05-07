import CompletedTodo from "@/models/complete-todo";
import { connectToDatabase } from "@/lib/database";

export const GET = async (request: Request, {params}: {params: {id: string}}) => {
  try {
    await connectToDatabase();
    const todos = await CompletedTodo.find({ creator: params.id}).populate("creator");
    if (!todos) return new Response("Todo Not Found", { status: 404 });

    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (error) {
    return new Response("Internal sever error", { status: 500 });
  }
};

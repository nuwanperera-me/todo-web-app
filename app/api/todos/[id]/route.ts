import { connectToDatabase } from "@/lib/database";
import Todo from "@/models/todo";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDatabase();
    const todos = await Todo.findById(params.id).populate("creator");
    if (!todos) return new Response("Todo Not Found", { status: 404 });

    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (error) {
    return new Response("Internal sever error", { status: 500 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  console.log(params.id);
  const { title, description, isImportant, isDone } = await request.json();
  try {
    await connectToDatabase();
    const todo = await Todo.findById(params.id);

    if (!todo) return new Response("Todo Not Found", { status: 404 });

    todo.title = title;
    todo.description = description;
    todo.isImportant = isImportant;
    todo.isDone = isDone;

    await todo.save();

    return new Response("Todo Updated", { status: 200 });
  } catch (error) {
    return new Response("Internal sever error", { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDatabase();
    const todo = await Todo.findByIdAndDelete(params.id);

    return new Response("Todo Deleted", { status: 200 });
  } catch (error) {
    return new Response("Internal sever error", { status: 500 });
  }
};

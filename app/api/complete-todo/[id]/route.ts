import { connectToDatabase } from "@/lib/database";
import CompletedTodo from "@/models/complete-todo";

export const POST = async (req: Request) => {
  const { userId, title, description, isImportant, date } = await req.json();
  try {
    await connectToDatabase();
    const newTodo = await CompletedTodo.create({
      creator: userId,
      title,
      description,
      isImportant,
      date,
    });
    await newTodo.save();
    return new Response(JSON.stringify(newTodo), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDatabase();
    const todo = await CompletedTodo.findByIdAndDelete(params.id);

    return new Response("Todo Deleted", { status: 200 });
  } catch (error) {
    return new Response("Internal sever error", { status: 500 });
  }
};

import { connectToDatabase } from "@/lib/database";
import Todo from "@/models/todo";

export const POST = async (req: Request) => {
  const { userId, title, description, isImportant } = await req.json();
  try {
    await connectToDatabase();
    const newTodo = await Todo.create({
      creater: userId,
      title,
      description,
      isImportant,
    });
    await newTodo.save();

    return new Response(JSON.stringify(newTodo), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

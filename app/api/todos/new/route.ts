import { connectToDatabase } from "@/lib/database";
import Todo from "@/models/todo";

export const POST = async (req: Request) => {
  const { userId, title, description, isImportant, date } = await req.json();
  try {
    await connectToDatabase();
    const newTodo = await Todo.create({
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

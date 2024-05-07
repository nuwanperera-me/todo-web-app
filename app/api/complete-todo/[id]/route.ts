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

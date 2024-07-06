import mongoose, { Schema, model, models } from "mongoose";

const TodoSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  description: {
    type: String,
  },
  date: {
    type: Number,
    required: true,
  },
  isImportant: {
    type: Boolean,
    default: false,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

const Todo = models.Todo || model("Todo", TodoSchema);
export default Todo;

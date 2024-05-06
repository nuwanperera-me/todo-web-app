import mongoose, { Schema, model, models } from "mongoose";

const TodoSchema = new Schema({
  creater: {
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
  isImportant: {
    type: Boolean,
    default: false,
  },
});

const Todo = models.Todo || model("Todo", TodoSchema);
export default Todo;

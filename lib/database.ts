import mongoose from "mongoose";

let mongoClient: mongoose.Mongoose | null = null;
let maxPoolSize: number = 10;

const options = {
  maxPoolSize: maxPoolSize,
};

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (mongoClient) {
    console.log("MongoDB is already connected.");
    return;
  }
  try {
    mongoClient = await mongoose.connect(process.env.MONGODB_URI || "", options);
    console.log("MongoDB is connected.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
  return mongoClient;
};

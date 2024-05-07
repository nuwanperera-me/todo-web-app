import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "TO-DOX",
    });
    isConnected = true;
    console.log("MongoDB is connected.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

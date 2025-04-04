import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error connecting to MongoDB: ", error.message);
    } else {
      console.log("An unknown error occurred while connecting to MongoDB");
    }
    process.exit(1);
  }
};

import mongoose from "mongoose"

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("Please add your Mongo URI to .env.local")
    }
    await mongoose.connect(process.env.MONGODB_URI as string, {})
    console.log("MongoDB connected")
  } catch (error) {
    console.log("Error connecting to MongoDB", error)
  }
}

export default connectDB

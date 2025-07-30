// import mongoose from "mongoose"
// import dotenv from "dotenv"

// const MONGO_URI = process.env.MONGO_URI || ""

// if (!MONGO_URI) {
//   throw new Error("⚠️ Missing MONGO_URI in environment variables")
// }

// let isConnected = false

// export const connectToDatabase = async () => {
//   if (isConnected) {
//     console.log("✅ Already connected to MongoDB")
//     return
//   }

//   try {
//     const db = await mongoose.connect(MONGO_URI, {
//       dbName: "library_db",
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     } as any)

//     isConnected = true
//     console.log("✅ MongoDB connected:", db.connection.host)
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error)
//     throw new Error("Failed to connect to MongoDB")
//   }
// }

// import express from "express"

// import { config } from "dotenv"
// import connectDB from "./lib/db"

// dotenv.config()

// const app = express()
// const PORT = process.env.PORT || 3000

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// )

// app.use(express.json())

// connectDB()

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

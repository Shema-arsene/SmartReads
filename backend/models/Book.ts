import mongoose from "mongoose"

const categoryEnum = [
  "Fiction",
  "Non-fiction",
  "Biography",
  "Self-help",
  "Science",
  "Technology",
  "History",
  "Children",
  "Romance",
  "Thriller",
  "Fantasy",
  "Business",
  "Education",
  "Health",
  "Religion",
]

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: categoryEnum,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    bookFile: {
      type: String,
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    readCount: {
      type: Number,
      default: 0,
    },
    favoritesCount: {
      type: Number,
      default: 0,
    },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Book || mongoose.model("Book", BookSchema)

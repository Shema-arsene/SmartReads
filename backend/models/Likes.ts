import mongoose from "mongoose"

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  { timestamps: true }
)

// Prevent duplicate likes
likeSchema.index({ user: 1, book: 1 }, { unique: true })

module.exports = mongoose.model("Like", likeSchema)

import { NextResponse } from "next/server"
import dbConnect from "@/backend/lib/db"
import Book from "@/backend/models/Book"

export const GET = async (
  _req: Request,
  context: { params: Promise<{ bookId: string }> }
) => {
  try {
    const { bookId } = await context.params // ✅ must await

    if (!bookId) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      )
    }

    await dbConnect()

    const book = await Book.findById(bookId)
    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 })
    }

    return NextResponse.json({ url: book.bookFile })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import dbConnect from "@/backend/lib/db"
import Book from "@/backend/models/Book"

export const GET = async (
  req: Request,
  { params }: { params: { bookId: string } }
) => {
  try {
    await dbConnect()

    const book = await Book.findById(params.bookId)
    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 })
    }

    return NextResponse.json(book, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    )
  }
}

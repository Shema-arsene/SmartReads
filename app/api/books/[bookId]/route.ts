import { NextResponse } from "next/server"
import dbConnect from "@/backend/lib/db"
import Book from "@/backend/models/Book"

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ bookId: string }> }
) => {
  try {
    await dbConnect()

    const { bookId } = await params // Await the params

    const book = await Book.findById(bookId)
    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 })
    }

    // Add CORS headers if needed
    const response = NextResponse.json(book, { status: 200 })
    response.headers.set("Access-Control-Allow-Origin", "*")

    return response
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    )
  }
}

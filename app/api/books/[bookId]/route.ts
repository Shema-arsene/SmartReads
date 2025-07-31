import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/backend/lib/db"
import Book from "@/backend/models/Book"

// GET /api/books/:id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect()

  try {
    const book = await Book.findById(params.id).populate("author", "name")

    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 })
    }

    return NextResponse.json({ book }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching book:", error)
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    )
  }
}

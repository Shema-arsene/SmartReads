import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/backend/lib/db"
import Book from "@/backend/models/Book"

// POST - Publish a new book
export async function POST(req: Request) {
  await dbConnect()

  try {
    // Parse JSON body
    const body = await req.json()
    const {
      title,
      author,
      category,
      description,
      price,
      imageUrl,
      bookUrl,
      uploader,
    } = body

    if (
      !title ||
      !author ||
      !category ||
      !description ||
      !price ||
      !imageUrl ||
      !bookUrl
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      )
    }

    // Create new book
    const newBook = await Book.create({
      title,
      author,
      category,
      description,
      price,
      imageUrl,
      bookFile: bookUrl,
      uploader: uploader,
    })

    return NextResponse.json(
      { message: "Book published successfully", book: newBook },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error publishing book:", error)
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    )
  }
}

// GET - Fetch all books
export async function GET(req: NextRequest) {
  await dbConnect()

  try {
    const books = await Book.find()
    return NextResponse.json({ books }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching books:", error)
    return NextResponse.json(
      { message: "Failed to fetch books", error: error.message },
      { status: 500 }
    )
  }
}

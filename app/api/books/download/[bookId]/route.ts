import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/backend/lib/db"
import Book from "@/backend/models/Book"

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await dbConnect()

  const { id } = params

  const book = await Book.findById(id)
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 })
  }

  // Assuming book.bookFile is a Cloudinary URL
  const fileUrl = book.bookFile

  // Option 1: Redirect to the Cloudinary file (auto download if set properly)
  return NextResponse.redirect(fileUrl)

  // Option 2 (if you want to force a download in frontend):
  // Return the file URL and use frontend logic to download via anchor tag
  // return NextResponse.json({ fileUrl })
}

import { NextRequest, NextResponse } from "next/server"
import { getTokenFromHeader, verifyToken } from "@/utils/jwtUtils"
import dbConnect from "@/backend/lib/db"
import Book from "@/backend/models/Book"
import { IncomingForm } from "formidable"
import fs from "fs"
import path from "path"

// Disable default body parser to handle form data
export const config = {
  api: {
    bodyParser: false,
  },
}

// POST - Publish a book
export async function POST(req: NextRequest) {
  await dbConnect()

  try {
    // 1. Parse JWT
    const token = getTokenFromHeader(req.headers)
    const decoded = token && verifyToken(token)

    if (!decoded || !["author", "publisher"].includes(decoded.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    // 2. Parse form data
    const form = new IncomingForm()
    const data = await new Promise((resolve, reject) => {
      form.parse(req as any, (err, fields, files) => {
        if (err) reject(err)
        resolve({ fields, files })
      })
    })

    const { fields, files }: any = data
    const { title, description, price, category } = fields
    const imageFile = files.image
    const bookFile = files.book

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !imageFile ||
      !bookFile
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      )
    }

    // 3. Store the image (e.g., to /public/uploads)
    const uploadDir = path.join(process.cwd(), "public/uploads")
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

    // 4. Store the cover image
    const imagePath = `/uploads/${imageFile.originalFilename}`
    const finalImagePath = path.join(uploadDir, imageFile.originalFilename)
    const imageDataBuffer = fs.readFileSync(imageFile.filepath)
    fs.writeFileSync(finalImagePath, imageDataBuffer)

    // 5. Store the book file
    const bookFilePath = `/uploads/${bookFile.originalFilename}`
    const finalBookPath = path.join(uploadDir, bookFile.originalFilename)
    const bookDataBuffer = fs.readFileSync(bookFile.filepath)
    fs.writeFileSync(finalBookPath, bookDataBuffer)

    // 6. Create book in DB
    const newBook = await Book.create({
      title,
      description,
      price,
      category: fields.category,
      imageURL: imagePath,
      bookFile: bookFilePath,
      uploader: decoded.id,
      createdBy: decoded.id,
    })

    console.log("✅ Book saved to DB:", newBook)

    return NextResponse.json(
      { message: "Book published", book: newBook },
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

// PUT - Update a book
export async function PUT(req: NextRequest) {
  await dbConnect()

  try {
    const token = getTokenFromHeader(req.headers)
    const decoded = verifyToken(token)

    if (!decoded || !["author", "publisher"].includes(decoded.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const bookId = searchParams.get("id")
    if (!bookId) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      )
    }

    const book = await Book.findById(bookId)
    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 })
    }

    // Optional: Check if the user is the author of the book
    if (String(book.author) !== decoded._id) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 })
    }

    const form = new IncomingForm()
    const data: any = await new Promise((resolve, reject) => {
      form.parse(req as any, (err, fields, files) => {
        if (err) reject(err)
        resolve({ fields, files })
      })
    })

    const { title, description, price, category } = data.fields
    const imageFile = data.files.image
    const bookFile = data.files.book

    // Update only provided fields
    if (title) book.title = title
    if (description) book.description = description
    if (price) book.price = price
    if (category) book.category = category

    const uploadDir = path.join(process.cwd(), "public/uploads")
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

    // If a new image is provided, update cover image file
    if (imageFile) {
      const imagePath = `/uploads/${imageFile.originalFilename}`
      const finalImagePath = path.join(uploadDir, imageFile.originalFilename)
      const imageDataBuffer = fs.readFileSync(imageFile.filepath)
      fs.writeFileSync(finalImagePath, imageDataBuffer)
      book.image = imagePath
    }

    // If a new book file is provided, update it as well
    if (bookFile) {
      const bookFilePath = `/uploads/${bookFile.originalFilename}`
      const finalBookPath = path.join(uploadDir, bookFile.originalFilename)
      const bookDataBuffer = fs.readFileSync(bookFile.filepath)
      fs.writeFileSync(finalBookPath, bookDataBuffer)
      book.bookFile = bookFilePath
    }

    await book.save()

    return NextResponse.json({ message: "Book updated", book }, { status: 200 })
  } catch (error: any) {
    console.error("Error updating book:", error)
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    )
  }
}

// DELETE - Delete a book by ID
export async function DELETE(req: NextRequest) {
  await dbConnect()

  try {
    const token = getTokenFromHeader(req.headers)
    const decoded = verifyToken(token)

    if (!decoded || !["author", "publisher"].includes(decoded.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const bookId = searchParams.get("id")
    if (!bookId) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      )
    }

    const book = await Book.findById(bookId)
    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 })
    }

    // Optional: Check if the user is the author
    if (String(book.author) !== decoded._id) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 })
    }

    await Book.findByIdAndDelete(bookId)

    return NextResponse.json({ message: "Book deleted" }, { status: 200 })
  } catch (error: any) {
    console.error("Error deleting book:", error)
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    )
  }
}

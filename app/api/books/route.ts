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

// GET - Fetch self-help books
// This endpoint is specifically for self-help books
// export async function GET(req: NextRequest) {
//   await dbConnect()

//   try {
//     const books = await Book.find({ category: { $regex: /self-help/i } })
//     return NextResponse.json({ books }, { status: 200 })
//   } catch (error: any) {
//     console.error("Error fetching self-help books:", error)
//     return NextResponse.json(
//       { message: "Failed to fetch books", error: error.message },
//       { status: 500 }
//     )
//   }
// }

// PUT - Update a book
// export async function PUT(req: NextRequest) {
//   await dbConnect()

//   try {
//     const token = getTokenFromHeader(req.headers)
//     const decoded = verifyToken(token)

//     if (!decoded || !["author", "publisher"].includes(decoded.role)) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
//     }

//     const { searchParams } = new URL(req.url)
//     const bookId = searchParams.get("id")
//     if (!bookId) {
//       return NextResponse.json(
//         { message: "Book ID is required" },
//         { status: 400 }
//       )
//     }

//     const book = await Book.findById(bookId)
//     if (!book) {
//       return NextResponse.json({ message: "Book not found" }, { status: 404 })
//     }

//     // Optional: Check if the user is the author of the book
//     if (String(book.author) !== decoded._id) {
//       return NextResponse.json({ message: "Access denied" }, { status: 403 })
//     }

//     const form = new IncomingForm()
//     const data: any = await new Promise((resolve, reject) => {
//       form.parse(req as any, (err, fields, files) => {
//         if (err) reject(err)
//         resolve({ fields, files })
//       })
//     })

//     const { title, description, price, category } = data.fields
//     const imageFile = data.files.image
//     const bookFile = data.files.book

//     // Update only provided fields
//     if (title) book.title = title
//     if (description) book.description = description
//     if (price) book.price = price
//     if (category) book.category = category

//     const uploadDir = path.join(process.cwd(), "public/uploads")
//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

//     // If a new image is provided, update cover image file
//     if (imageFile) {
//       const imagePath = `/uploads/${imageFile.originalFilename}`
//       const finalImagePath = path.join(uploadDir, imageFile.originalFilename)
//       const imageDataBuffer = fs.readFileSync(imageFile.filepath)
//       fs.writeFileSync(finalImagePath, imageDataBuffer)
//       book.image = imagePath
//     }

//     // If a new book file is provided, update it as well
//     if (bookFile) {
//       const bookFilePath = `/uploads/${bookFile.originalFilename}`
//       const finalBookPath = path.join(uploadDir, bookFile.originalFilename)
//       const bookDataBuffer = fs.readFileSync(bookFile.filepath)
//       fs.writeFileSync(finalBookPath, bookDataBuffer)
//       book.bookFile = bookFilePath
//     }

//     await book.save()

//     return NextResponse.json({ message: "Book updated", book }, { status: 200 })
//   } catch (error: any) {
//     console.error("Error updating book:", error)
//     return NextResponse.json(
//       { message: error.message || "Server error" },
//       { status: 500 }
//     )
//   }
// }

// // DELETE - Delete a book by ID
// export async function DELETE(req: NextRequest) {
//   await dbConnect()

//   try {
//     const token = getTokenFromHeader(req.headers)
//     const decoded = verifyToken(token)

//     if (!decoded || !["author", "publisher"].includes(decoded.role)) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
//     }

//     const { searchParams } = new URL(req.url)
//     const bookId = searchParams.get("id")
//     if (!bookId) {
//       return NextResponse.json(
//         { message: "Book ID is required" },
//         { status: 400 }
//       )
//     }

//     const book = await Book.findById(bookId)
//     if (!book) {
//       return NextResponse.json({ message: "Book not found" }, { status: 404 })
//     }

//     // Optional: Check if the user is the author
//     if (String(book.author) !== decoded._id) {
//       return NextResponse.json({ message: "Access denied" }, { status: 403 })
//     }

//     await Book.findByIdAndDelete(bookId)

//     return NextResponse.json({ message: "Book deleted" }, { status: 200 })
//   } catch (error: any) {
//     console.error("Error deleting book:", error)
//     return NextResponse.json(
//       { message: error.message || "Server error" },
//       { status: 500 }
//     )
//   }
// }

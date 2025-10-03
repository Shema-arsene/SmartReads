"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type User = {
  _id: string
  id: string
  firstName: string
  secondName: string
  email: string
  role: string
}

type PublishBookFormProps = {
  user: User
}

export const bookCategories = [
  { value: "", label: "All Categories" },
  { value: "Religion", label: "Religion" },
  { value: "Fiction", label: "Fiction" },
  { value: "Non-fiction", label: "Non-fiction" },
  { value: "Biography", label: "Biography" },
  { value: "Self-help", label: "Self-help" },
  { value: "Science", label: "Science" },
  { value: "Technology", label: "Technology" },
  { value: "History", label: "History" },
  { value: "Children", label: "Children" },
  { value: "Romance", label: "Romance" },
  { value: "Thriller", label: "Thriller" },
  { value: "Fantasy", label: "Fantasy" },
  { value: "Business", label: "Business" },
  { value: "Education", label: "Education" },
  { value: "Health", label: "Health" },
]

const PublishBookForm = ({ user }: PublishBookFormProps) => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    price: "",
    image: "",
    book: "",
  })

  const [image, setImage] = useState<File | null>(null)
  const [bookFile, setBookFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const token = localStorage.getItem("token")

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImage(file)
  }

  const uploadImageToCloudinary = async (
    imageFile: File
  ): Promise<string | null> => {
    const formData = new FormData()
    formData.append("file", imageFile)
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    )

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      const data = await res.json()
      return data.secure_url // This is the URL to save in your DB
    } catch (err) {
      console.error("Cloudinary upload failed:", err)
      return null
    }
  }

  const uploadBookFile = async (bookFile: File): Promise<string | null> => {
    const formData = new FormData()
    formData.append("file", bookFile)
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    )
    formData.append("resource_type", "raw") // important for PDFs, EPUBs

    try {
      const res = await fetch(
        // `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/assets/media_library/folders/SmartReads_books_folder`,
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/raw/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      const data = await res.json()
      return data.secure_url // This is the URL to save in your DB
    } catch (err) {
      console.error("Cloudinary upload failed:", err)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    const { title, author, category, description, price } = formData

    if (
      !title ||
      !author ||
      !category ||
      !description ||
      !price ||
      !image ||
      !bookFile
    ) {
      setLoading(false)
      setError("All fields are required.")
      return
    }

    try {
      // 1. Upload image to Cloudinary
      const imageUrl = await uploadImageToCloudinary(image)
      const bookUrl = await uploadBookFile(bookFile)

      if (!imageUrl) {
        setLoading(false)
        setError("Failed to upload image.")
        return
      }

      // 2. Prepare payload
      const bookPayload = {
        title,
        author,
        category,
        description,
        price,
        imageUrl,
        bookUrl,
        uploader: user.id,
      }

      // 3. Send to backend
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookPayload),
      })

      if (!res.ok) {
        const data = await res.json()
        console.error("API error:", data)
        throw new Error(data.message || "Failed to publish book.")
      }

      toast.success("Book published successfully", {
        description: `'Book: ${title}' was published successfully!`,
      })

      // 4. Reset UI
      setSuccess("Book published successfully!")
      setFormData({
        title: "",
        author: "",
        category: "",
        description: "",
        price: "",
        image: "",
        book: "",
      })

      setImage(null)
      setBookFile(null)
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
      router.replace("/")
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto space-y-4 p-6 bg-white rounded shadow"
      >
        <h2 className="text-2xl font-bold text-center my-5">
          Publish New Book
        </h2>

        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Book Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Book title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-700"
          />
        </div>

        <div>
          <label htmlFor="author" className="block font-medium mb-1">
            Author Name
          </label>
          <input
            id="author"
            type="text"
            name="author"
            placeholder="Author's name"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-700"
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-700"
          >
            {bookCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Book Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Book description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-700"
          />
        </div>

        <div>
          <label htmlFor="price" className="block font-medium mb-1">
            Price (USD)
          </label>
          <input
            id="price"
            type="number"
            name="price"
            placeholder="ex: 9.99"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-700"
          />
        </div>

        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Cover Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-700"
          />
        </div>

        <div>
          <label htmlFor="bookFile" className="block font-medium mb-1">
            Book File (PDF or Word)
          </label>
          <input
            id="bookFile"
            type="file"
            name="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setBookFile(e.target.files?.[0] || null)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-700"
          />
        </div>

        {error && <p className="text-red-600 my-3">{error}</p>}
        {success && <p className="text-green-600 my-3">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#c8553dff] text-white font-medium px-4 py-2 rounded-lg hover:bg-[#e0553dff] cursor-pointer"
        >
          {loading ? "Publishing..." : "Publish Book"}
        </button>
      </form>
    </div>
  )
}

export default PublishBookForm

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const PublishBookForm = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    price: "",
  })

  const [image, setImage] = useState<File | null>(null)
  const [bookFile, setBookFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImage(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    const { title, author, category, description, price } = formData

    if (!title || !author || !category || !description || !price || !bookFile) {
      setLoading(false)
      setError("All fields are required")
      return
    }

    try {
      const data = new FormData()
      data.append("title", formData.title)
      data.append("author", formData.author)
      data.append("category", formData.category)
      data.append("description", formData.description)
      data.append("price", formData.price)
      if (image) data.append("image", image)
      if (bookFile) data.append("book", bookFile)

      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token")

      if (!token) {
        setLoading(false)
        setError("You must be logged in to publish a book.")
        return
      }

      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong")
      }

      setSuccess("Book published successfully!")
      setFormData({
        title: "",
        author: "",
        category: "",
        description: "",
        price: "",
      })
      setImage(null)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-4 p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold text-center my-5">Publish New Book</h2>

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
        <input
          id="category"
          type="text"
          name="category"
          placeholder="Book category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-700"
        />
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
  )
}

export default PublishBookForm

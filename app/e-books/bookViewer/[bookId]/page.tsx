"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import dynamic from "next/dynamic"
import "react-pdf/dist/Page/AnnotationLayer.css"
import { pdfjs } from "react-pdf"

// ✅ Set worker source immediately when this file is loaded (browser only)
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
}
const Document = dynamic(
  () => import("react-pdf").then((mod) => mod.Document),
  { ssr: false }
)
const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), {
  ssr: false,
})

const BookViewer = () => {
  const { bookId } = useParams()
  const [pdfUrl, setPdfUrl] = useState(null)
  const [numPages, setNumPages] = useState(null)

  const fetchPdf = async () => {
    try {
      const res = await fetch(`/api/books/${bookId}/read`)
      if (!res.ok) throw new Error("Access Denied")

      const data = await res.json()
      setPdfUrl(data.url)
    } catch (err) {
      console.error("Error fetching PDF:", err)
    }
  }

  useEffect(() => {
    if (bookId) fetchPdf()
  }, [bookId])

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages)

  return (
    <div className="max-w-4xl mx-auto">
      {pdfUrl ? (
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (_, i) => (
            <Page key={i} pageNumber={i + 1} />
          ))}
        </Document>
      ) : (
        <p className="my-40 text-center">Loading book...</p>
      )}
    </div>
  )
}

export default BookViewer

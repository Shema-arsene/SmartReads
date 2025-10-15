// // "use client"

// // import { useParams, useRouter } from "next/navigation"
// // import React, { useEffect, useState } from "react"
// // import { toast } from "sonner"
// // // PDF Viewer
// // import { Document, Page, pdfjs } from "react-pdf"

// // interface Book {
// //   _id: string
// //   title: string
// //   author: string
// //   category: string
// //   description: string
// //   imageUrl: string
// //   bookFile: string
// // }

// // // Configure PDF.js worker - Use the exact version from your package
// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdn.jsdelivr.net/npm/pdfjs-dist@5.3.93/build/pdf.worker.min.js`

// // const PageComponent = () => {
// //   const { bookId } = useParams()
// //   const [book, setBook] = useState<Book | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [numPages, setNumPages] = useState<number | null>(null)
// //   const [pageNumber, setPageNumber] = useState(1)
// //   const [pdfError, setPdfError] = useState<string | null>(null)
// //   const [pdfLoading, setPdfLoading] = useState(false)

// //   const router = useRouter()

// //   const fetchBook = async () => {
// //     try {
// //       const res = await fetch(`/api/books/${bookId}`)
// //       const data = await res.json()
// //       setBook(data)
// //       console.log("loaded book: ", data.bookFile)
// //       toast.success("Book Fetched", {
// //         description: `'${data.title}' was fetched successfully`,
// //       })
// //     } catch (err) {
// //       console.error("Failed to fetch book:", err)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   useEffect(() => {
// //     if (!bookId) {
// //       router.push("/")
// //     }
// //     fetchBook()
// //   }, [bookId])

// //   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
// //     setNumPages(numPages)
// //     setPdfError(null)
// //     setPdfLoading(false)
// //     console.log(`PDF loaded successfully with ${numPages} pages`)
// //   }

// //   function onDocumentLoadError(error: Error) {
// //     console.error("PDF loading error:", error)
// //     setPdfError(`Failed to load PDF: ${error.message}`)
// //     setPdfLoading(false)
// //     toast.error("PDF Loading Error", {
// //       description: "Could not load the PDF file.",
// //     })
// //   }

// //   if (loading) {
// //     return (
// //       <div className="text-3xl text-center my-40 font-bold">
// //         Loading Book Data...
// //       </div>
// //     )
// //   }

// //   return (
// //     <div>
// //       <h1 className="text-center my-10 font-bold">Reading: {book?.title}</h1>

// //       {/* PDF Viewer */}
// //       <div className="flex flex-col items-center min-h-[600px]">
// //         {pdfError && (
// //           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-2xl w-full">
// //             <strong>Error: </strong>
// //             {pdfError}
// //           </div>
// //         )}

// //         <div className="border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm">
// //           <Document
// //             file={book?.bookFile}
// //             onLoadSuccess={onDocumentLoadSuccess}
// //             onLoadError={onDocumentLoadError}
// //             loading={
// //               <div className="text-center py-8">
// //                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
// //                 <p className="mt-2 text-gray-600">Loading PDF...</p>
// //               </div>
// //             }
// //             noData={
// //               <div className="text-center py-8">
// //                 <p className="text-gray-600">No PDF file available</p>
// //               </div>
// //             }
// //           >
// //             <Page
// //               pageNumber={pageNumber}
// //               width={800}
// //               loading={
// //                 <div className="text-center py-8">
// //                   <p className="text-gray-600">Loading page {pageNumber}...</p>
// //                 </div>
// //               }
// //             />
// //           </Document>
// //         </div>

// //         {/* Navigation Controls */}
// //         {numPages && (
// //           <div className="flex items-center gap-4 mt-6">
// //             <button
// //               className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded disabled:bg-gray-300 duration-300 cursor-pointer"
// //               disabled={pageNumber <= 1}
// //               onClick={() => setPageNumber((prev) => prev - 1)}
// //             >
// //               Previous
// //             </button>

// //             <span className="text-gray-700 font-medium">
// //               Page {pageNumber} of {numPages}
// //             </span>

// //             <button
// //               className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded disabled:bg-gray-300 duration-300 cursor-pointer"
// //               disabled={pageNumber >= numPages}
// //               onClick={() => setPageNumber((prev) => prev + 1)}
// //             >
// //               Next
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   )
// // }

// // export default PageComponent

// "use client"

// import { useParams, useRouter } from "next/navigation"
// import React, { useEffect, useState } from "react"
// import { toast } from "sonner"
// // PDF Viewer
// import { Document, Page, pdfjs } from "react-pdf"

// interface Book {
//   _id: string
//   title: string
//   author: string
//   category: string
//   description: string
//   imageUrl: string
//   bookFile: string
// }

// // Configure PDF.js worker - EXACT VERSION MATCH
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdn.jsdelivr.net/npm/pdfjs-dist@5.3.93/build/pdf.worker.min.js`

// const PageComponent = () => {
//   const { bookId } = useParams()
//   const [book, setBook] = useState<Book | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [numPages, setNumPages] = useState<number | null>(null)
//   const [pageNumber, setPageNumber] = useState(1)
//   const [pdfError, setPdfError] = useState<string | null>(null)

//   const router = useRouter()

//   const fetchBook = async () => {
//     try {
//       const res = await fetch(`/api/books/${bookId}`)

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`)
//       }

//       const data = await res.json()
//       console.log("Book file URL:", data.bookFile)

//       setBook(data)

//       toast.success("Book Fetched", {
//         description: `'${data.title}' was fetched successfully`,
//       })
//     } catch (err) {
//       console.error("Failed to fetch book:", err)
//       toast.error("Error", {
//         description: "Failed to load book data",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (!bookId) {
//       router.push("/")
//       return
//     }
//     fetchBook()
//   }, [bookId])

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//     setNumPages(numPages)
//     setPdfError(null)
//     console.log(`PDF loaded successfully with ${numPages} pages`)
//   }

//   function onDocumentLoadError(error: Error) {
//     console.error("PDF loading error:", error)
//     setPdfError(`Failed to load PDF: ${error.message}`)
//   }

//   if (loading) {
//     return (
//       <div className="text-3xl text-center my-40 font-bold">
//         Loading Book Data...
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h1 className="text-center my-10 font-bold">Reading: {book?.title}</h1>

//       {/* PDF Viewer */}
//       <div className="flex flex-col items-center min-h-[600px]">
//         {pdfError && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-2xl w-full">
//             <strong>PDF Error: </strong>
//             {pdfError}
//           </div>
//         )}

//         <div className="border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm">
//           <Document
//             file={book?.bookFile}
//             onLoadSuccess={onDocumentLoadSuccess}
//             onLoadError={onDocumentLoadError}
//             loading={
//               <div className="text-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
//                 <p className="mt-2 text-gray-600">Loading PDF...</p>
//               </div>
//             }
//           >
//             <Page
//               pageNumber={pageNumber}
//               width={800}
//               loading={
//                 <div className="text-center py-8">
//                   <p className="text-gray-600">Loading page {pageNumber}...</p>
//                 </div>
//               }
//             />
//           </Document>

//           {/* Navigation Controls */}
//           {numPages && (
//             <div className="flex items-center gap-4 mt-6 justify-center">
//               <button
//                 className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded disabled:bg-gray-300 duration-300 cursor-pointer"
//                 disabled={pageNumber <= 1}
//                 onClick={() => setPageNumber((prev) => prev - 1)}
//               >
//                 Previous
//               </button>

//               <span className="text-gray-700 font-medium">
//                 Page {pageNumber} of {numPages}
//               </span>

//               <button
//                 className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded disabled:bg-gray-300 duration-300 cursor-pointer"
//                 disabled={pageNumber >= numPages}
//                 onClick={() => setPageNumber((prev) => prev + 1)}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PageComponent

"use client"

import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"

interface Book {
  _id: string
  title: string
  author: string
  category: string
  description: string
  imageUrl: string
  bookFile: string
}

const PageComponent = () => {
  const { bookId } = useParams()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [pdfLoadError, setPdfLoadError] = useState(false)

  const router = useRouter()

  const fetchBook = async () => {
    try {
      const res = await fetch(`/api/books/${bookId}`)

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      console.log("Book file URL:", data.bookFile)

      setBook(data)

      toast.success("Book Fetched", {
        description: `'${data.title}' was fetched successfully`,
      })
    } catch (err) {
      console.error("Failed to fetch book:", err)
      toast.error("Error", {
        description: "Failed to load book data",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!bookId) {
      router.push("/")
      return
    }
    fetchBook()
  }, [bookId])

  const handleIframeError = () => {
    setPdfLoadError(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Books
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{book?.title}</h1>
          <p className="text-gray-600 mt-2">by {book?.author}</p>
          {book?.description && (
            <p className="text-gray-500 mt-3 max-w-2xl">{book?.description}</p>
          )}
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {book?.bookFile ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4 bg-gray-50 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Reading: {book.title}
              </h2>
              {/* <a
                href={book.bookFile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download PDF
              </a> */}
            </div>

            {/* PDF Display */}
            <div className="h-[calc(100vh-250px)]">
              {pdfLoadError ? (
                <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-8">
                  <div className="text-red-500 mb-4">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Failed to Load PDF
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    There was an error loading the PDF viewer. You can still
                    download the PDF file.
                  </p>
                  <a
                    href={book.bookFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download PDF File
                  </a>
                </div>
              ) : (
                <iframe
                  src={book.bookFile}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title={`PDF Viewer - ${book.title}`}
                  onError={handleIframeError}
                  className="bg-white"
                />
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-yellow-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No PDF Available
            </h2>
            <p className="text-gray-600 mb-6">
              This book doesn't have a PDF file attached.
            </p>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              ← Back to Books
            </button>
          </div>
        )}
      </div>

      {/* <p>view pdf </p> */}

      {/* <iframe
        src={book?.bookFile}
        height={500}
        width={300}
        className="z-20 "
      ></iframe> */}
    </div>
  )
}

export default PageComponent

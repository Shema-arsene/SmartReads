"use client"

import DocViewer, { DocViewerRenderers } from "react-doc-viewer"

const BookReader = ({
  fileUrl,
  bookTitle,
}: {
  fileUrl: string
  bookTitle: string
}) => {
  // Extract extension
  const extensionExtractor = (url: string) => {
    return url.split(".").pop().split("?")[0].toLowerCase()
  }

  const getFileTypeFromUrl = (url: string) => {
    try {
      return extensionExtractor(url)
    } catch {
      return "pdf" // fallback if parsing fails
    }
  }

  const fileType = getFileTypeFromUrl(fileUrl)

  const docs = [
    {
      url: fileUrl,
      fileType: fileType,
    },
  ]

  return (
    <main>
      <h1 className="my-3 font-medium text-3xl text-center">
        Book title: {bookTitle}
      </h1>
      <div className="w-full h-screen">
        <DocViewer
          documents={docs}
          pluginRenderers={DocViewerRenderers}
          className="w-full h-full"
        />
      </div>
    </main>
  )
}

export default BookReader

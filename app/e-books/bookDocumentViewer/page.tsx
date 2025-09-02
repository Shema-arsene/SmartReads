"use client"

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"

export default function DocumentViewer() {
  const docs = [
    {
      uri: "https://res.cloudinary.com/demo/raw/upload/v1699000000/sample.pdf",
      fileType: "pdf", // optional, but recommended
    },
    {
      uri: "https://res.cloudinary.com/demo/raw/upload/v1699000000/sample.docx",
      fileType: "docx",
    },
    {
      uri: "https://res.cloudinary.com/demo/raw/upload/v1699000000/sample.doc",
      fileType: "doc",
    },
  ]

  return (
    <div className="h-screen w-full p-4">
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        style={{
          height: "100%",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      />
    </div>
  )
}

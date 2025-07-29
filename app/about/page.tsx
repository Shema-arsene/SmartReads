import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About SmartReads",
  description: "Learn More about SmartReads and what we do!",
  keywords: "books, ebooks, audiobooks, podcasts",
  twitter: {
    card: "summary_large_image",
    title: "About us | Business Name",
  },
}

const page = () => {
  return (
    <section>
      <h1>About SmartReads</h1>
    </section>
  )
}

export default page

import type { Metadata } from "next"
import { Lato } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { AuthProvider } from "./context/AuthContext"
import { Toaster } from "sonner"

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
})

export const metadata: Metadata = {
  title: "SmartReads",
  description:
    "Premium Digital Library System for Authors, Readers, and Publishers",
  keywords: "books, publish",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased font-sans`}>
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster position="top-right" richColors />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const Navbar = () => {
  const pathname = usePathname()

  return (
    <header className="">
      {/* Top section */}
      <section className="bg-gray-50/50 flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          SmartReads
        </Link>

        <form action="">
          <input
            type="text"
            className="w-lg rounded-full border border-black px-5 py-2"
          />
        </form>

        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="bg-black text-white font-medium px-4 py-2 rounded-lg hover:opacity-70 duration-300"
          >
            Read free for 30 days
          </Link>
          <Link
            href="/signin"
            className="font-medium border border-black px-3 py-1.5 rounded-lg hover:outline-1 hover:outline-black"
          >
            Sign In
          </Link>
        </div>
      </section>
      {/* Bottom section */}
      <section className="w-full flex items-center justify-center py-4">
        <nav className="flex items-center text-lg font-thin">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About SmartReads" },
            { href: "/audio-books", label: "Audio-Books" },
            { href: "/e-books", label: "E-Books" },
          ].reduce((acc, { href, label }, index, arr) => {
            acc.push(
              <Link
                key={href}
                href={href}
                className={`${
                  pathname === href ? "underline" : "text-black"
                } hover:underline duration-300`}
              >
                {label}
              </Link>
            )
            if (index < arr.length - 1) {
              acc.push(
                <span key={`sep-${index}`} className="mx-2 text-gray-600">
                  |
                </span>
              )
            }
            return acc
          }, [] as React.ReactNode[])}
        </nav>
      </section>
    </header>
  )
}

export default Navbar

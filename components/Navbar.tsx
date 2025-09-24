"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import { useState } from "react"
import LogoutButton from "@/components/uiComponent/LogoutButton"
import UserDropdown from "./uiComponent/UserDropdown"
import { FiLogOut } from "react-icons/fi"
import { LogIn } from "lucide-react"

const Navbar = () => {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(true)
  const [logoutAlert, setLogoutAlert] = useState(false)

  return (
    <header className="">
      {/* Top section */}
      <section className="bg-gray-50/50 flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          SmartReads
        </Link>

        {user ? (
          <div className="relative flex items-center gap-3 cursor-pointer">
            {user.role === "reader" && (
              <Link
                href="/"
                className="font-light hover:underline duration-200"
              >
                Become an Author?
              </Link>
            )}
            <UserDropdown />
            <LogoutButton />
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-3">
              <Link
                href="/checkout"
                className="font-medium  hover:underline duration-200"
              >
                Read free for 30 days
              </Link>
              <Link
                href="/"
                className="font-medium hover:underline duration-200"
              >
                Become an Author?
              </Link>
              <Link
                href="/signin"
                className="flex items-center gap-1 font-medium border border-black px-3 py-1.5 rounded-sm hover:outline-1 hover:outline-black"
              >
                Sign In
                <LogIn />
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Bottom section */}
      <section className="w-full flex items-center justify-center py-4 shadow-sm">
        {/* Authors and Publishers Navbar */}
        {(user?.role === "author" || user?.role === "publisher") && (
          <nav className="flex items-center text-lg font-light">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About SmartReads" },
              { href: "/publish", label: "Publish a book" },
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
        )}

        {/* Readers Navbar */}
        {user?.role === "reader" && (
          <nav className="flex items-center text-lg font-light">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About SmartReads" },
              { href: "/e-books", label: "E-Books" },
              { href: "/favorites", label: "Favorites" },
              { href: "/likes", label: "Likes" },
              { href: "/read-history", label: "Read History" },
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
        )}
      </section>
    </header>
  )
}

export default Navbar

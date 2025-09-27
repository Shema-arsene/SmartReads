"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import { useState } from "react"
import LogoutButton from "@/components/uiComponent/LogoutButton"
import UserDropdown from "./uiComponent/UserDropdown"
import { LogIn, Menu, X } from "lucide-react"

const Navbar = () => {
  const pathname = usePathname()
  const { user } = useAuth()

  const [userMenuOpen, setUserMenuOpen] = useState(true)

  return (
    <header className="">
      {/* Top section */}
      <section className="bg-gray-50/50 flex items-center justify-between px-5 py-7">
        <Link href="/" className="text-2xl font-bold">
          SmartReads
        </Link>

        {user ? (
          <div className="relative flex items-center gap-3 cursor-pointer">
            {user.role === "reader" && (
              <ul className="flex items-center gap-3">
                <li>
                  <Link
                    href="/checkout"
                    className="hidden lg:block font-light hover:underline duration-200"
                  >
                    Start your free 30 days
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="hidden lg:block font-light hover:underline duration-200"
                  >
                    Become an Author?
                  </Link>
                </li>
              </ul>
            )}
            <UserDropdown />
            <div className={``}>
              <LogoutButton />
            </div>
            <Menu />
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-3">
              <Link
                href="/checkout"
                className="hidden lg:block font-light  hover:underline duration-200"
              >
                Read free for 30 days
              </Link>
              <Link
                href="/"
                className="hidden lg:block font-light hover:underline duration-200"
              >
                Become an Author?
              </Link>
              <Link
                href="/signin"
                className="hidden lg:flex items-center gap-1 font-medium border border-black px-3 py-1.5 rounded-sm hover:outline-1 hover:outline-black"
              >
                Sign In
                <LogIn />
              </Link>
              <Menu
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="block lg:hidden cursor-pointer hover:scale-110 duration-300"
                height={35}
                width={35}
              />
            </div>
          </>
        )}
      </section>

      {/* Bottom section */}
      <section className="w-full hidden lg:flex items-center justify-center py-4 shadow-sm">
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

        {!user && (
          <nav className="flex items-center text-lg font-light">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About SmartReads" },
              { href: "/e-books", label: "E-Books" },
              { href: "/joinSmartReads", label: "Join our Team" },
              { href: "/becomeAnAuthor", label: "Become an Author" },
              { href: "/Checkout", label: "Read free for 30 days" },
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

      {/* Responsive Nav */}
      <section
        className={`fixed top-0 right-0 z-20 w-[400px] ${
          userMenuOpen ? "translate-x-0" : "translate-x-100"
        } bg-white border-2 border-gray-200 h-screen pt-20 px-5 duration-1000 lg:hidden`}
      >
        <X
          className="absolute top-5 right-3 cursor-pointer hover:scale-110 duration-300"
          height={35}
          width={35}
          onClick={() => setUserMenuOpen(false)}
        />
        {!user && (
          <nav className="flex flex-col items-start text-lg font-light gap-3">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About SmartReads" },
              { href: "/e-books", label: "E-Books" },
              { href: "/joinSmartReads", label: "Join our Team" },
              { href: "/becomeAnAuthor", label: "Become an Author" },
              { href: "/Checkout", label: "Read free for 30 days" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  pathname === link.href ? "underline font-normal" : ""
                } hover:underline duration-300`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/signin"
              className="flex items-center gap-1 mx-auto my-5 font-medium border border-black px-3 py-1.5 rounded-sm hover:outline-1 hover:outline-black"
            >
              Sign In
              <LogIn />
            </Link>
          </nav>
        )}
      </section>
    </header>
  )
}

export default Navbar

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import { FiUser } from "react-icons/fi"
import { FaAngleDown } from "react-icons/fa6"
import { FaAngleUp } from "react-icons/fa6"
import { useState } from "react"
import LogoutButton from "@/components/uiComponent/LogoutButton"
import ProfileAvatar from "@/components/uiComponent/ProfileAvatar"

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
          <div className="relative flex items-center gap-1.5 cursor-pointer">
            <FiUser className="h-7 w-7" />
            {/* <span className="font-medium"></span> */}
            <ProfileAvatar />
            {isUserMenuOpen ? <FaAngleUp /> : <FaAngleDown />}
            {isUserMenuOpen && (
              <div className="absolute top-10 right-24 bg-gray-50/50 border border-black rounded-sm p-1 flex flex-col">
                <Link href="/profile">Profile</Link>
                <Link href="/">LogOut</Link>
              </div>
            )}

            <LogoutButton />

            <button
              onClick={() => setLogoutAlert(true)}
              className="ml-4 flex items-center gap-1.5 text-black cursor-pointer"
            ></button>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-3">
              <Link
                href="/checkout"
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
          </>
        )}
      </section>

      {/* Bottom section */}
      <section className="w-full flex items-center justify-center py-4">
        {/* Authors and Publishers Navbar */}
        {user?.role === "author" ||
          (user?.role === "publisher" && (
            <nav className="flex items-center text-lg font-thin">
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
          ))}

        {/* Readers Navbar */}
        {user?.role === "reader" && (
          <nav className="flex items-center text-lg font-thin">
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

      {/* Logout overlay */}
      {logoutAlert && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="max-w-md p-10 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg">
            <h1 className="font-medium text-xl mb-5">
              Are you sure you want to log out?
            </h1>
            <div className="w-full flex items-center justify-center gap-4 mt-4">
              <button
                className="border-2 border-black bg-gray-300 text-black px-4 py-2 rounded-lg font-medium hover:opacity-70 cursor-pointer"
                onClick={() => setLogoutAlert(false)}
              >
                Cancel
              </button>
              <button
                className="border-2 border-black bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-70 cursor-pointer"
                onClick={() => {
                  logout()
                  setLogoutAlert(false)
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar

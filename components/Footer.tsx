"use client"

import Link from "next/link"
import {
  FaInstagram,
  FaTwitter,
  FaXTwitter,
  FaFacebook,
  FaPinterest,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa6"

const Footer = () => {
  const CurrentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50/50">
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <section className="p-5">
          <h1 className="text-lg font-medium my-3">About</h1>
          <ul>
            <li>
              <Link href="/about">About SmartReads</Link>
            </li>
            <li>
              <Link href="/about">Our Blog</Link>
            </li>
            <li>
              <Link href="/about">Join our team!</Link>
            </li>
            <li>
              <Link href="/about">Contact us</Link>
            </li>
            <li>
              <Link href="/about">Redeem gift card</Link>
            </li>
          </ul>
        </section>

        <section className="p-5">
          <h1 className="text-lg font-medium my-3">Support</h1>
          <ul>
            <li>
              <Link href="/about">Help / FAQ</Link>
            </li>
            <li>
              <Link href="/about">Accessibility</Link>
            </li>
            <li>
              <Link href="/about">Purchase Help</Link>
            </li>
            <li>
              <Link href="/about">AdChoices</Link>
            </li>
          </ul>
        </section>

        <section className="p-5">
          <h1 className="text-lg font-medium my-3">Legal</h1>
          <ul>
            <li>
              <Link href="/about">Terms</Link>
            </li>
            <li>
              <Link href="/about">Privacy</Link>
            </li>
            <li>
              <Link href="/about">Copyright</Link>
            </li>
            <li>
              <Link href="/about">Cookie Preferences</Link>
            </li>
            <li>
              <Link href="/about">
                Do not sell or share my personal information
              </Link>
            </li>
          </ul>
        </section>

        <section className="p-5">
          <h1 className="text-lg font-medium my-3">Social</h1>
          <ul>
            <li className="flex items-center gap-2">
              <FaInstagram />
              <Link href="/about">Instagram</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaXTwitter />
              <Link href="/about">Twitter (X)</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaFacebook />
              <Link href="/about">Facebook</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaPinterest />
              <Link href="/about">Pinterest</Link>
            </li>
          </ul>
        </section>

        <section className="p-5">
          <h1 className="text-lg font-medium my-3">Get Our Free Apps</h1>

          <div className="space-y-2">
            <div className="w-[180px] h-[50px] flex items-center gap-2 bg-black text-white p-2 rounded-lg">
              <FaApple className="w-[35px] h-[35px]" />
              <div className="-space-y-1.5">
                <p className="text-xs font-medium uppercase">Download on the</p>
                <h3 className="text-xl">App Store</h3>
              </div>
            </div>

            <div className="w-[180px] h-[50px] flex items-center gap-2 bg-black text-white p-2 rounded-lg">
              <FaGooglePlay className="w-[35px] h-[35px]" />
              <div className="-space-y-1.5">
                <p className="text-xs font-medium uppercase">Get It On</p>
                <h3 className="text-xl">Google Play</h3>
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-10">
        <div className="flex items-center text-lg font-thin">
          {[
            { href: "/audio-books", label: "Audio-Books" },
            { href: "/e-books", label: "Books" },
            { href: "/", label: "Podcasts" },
          ].reduce<React.ReactNode[]>((acc, { href, label }, index, arr) => {
            acc.push(
              <Link
                href={href}
                key={`link-${index}`}
                className="text-black text-sm hover:underline duration-300 whitespace-nowrap"
              >
                {label}
              </Link>
            )
            if (index < arr.length - 1) {
              acc.push(
                <span key={`sep-${index}`} className="mx-3 text-black">
                  •
                </span>
              )
            }
            return acc
          }, [])}
        </div>

        <div>
          <p className="text-sm font-thin whitespace-nowrap">
            Copyright &copy; {CurrentYear} SmartReads Inc.
          </p>
        </div>
      </aside>
    </footer>
  )
}

export default Footer

"use client"

import Link from "next/link"
import {
  FaInstagram,
  FaXTwitter,
  FaFacebook,
  FaPinterest,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa6"

const Footer = () => {
  const CurrentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50/50 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {/* About */}
        <section className="p-5">
          <h1 className="text-lg font-medium my-3">About</h1>

          <p className="text-gray-700 my-3">
            SmartReads is a Premium Digital Library System for Authors, Readers,
            and Publishers
          </p>

          <ul>
            <li>
              <Link href="/about" className="hover:underline duration-200">
                About SmartReads
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:underline duration-200">
                Help / FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline duration-200">
                Contact us
              </Link>
            </li>
          </ul>
        </section>

        {/* Career */}
        <section className="p-5">
          <h1 className="text-lg font-medium my-3">Career</h1>
          <ul>
            <li>
              Want to join our team?{" "}
              <Link
                href="/about"
                className="font-medium hover:underline duration-200"
              >
                Join our team!
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline duration-200">
                Purchase Help
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline duration-200">
                AdChoices
              </Link>
            </li>
          </ul>
        </section>

        {/* Socials */}
        <section className="p-5">
          <h1 className="text-lg font-medium my-3">Social</h1>
          <ul>
            <li className="flex items-center gap-2 hover:underline duration-200 cursor-pointer">
              <FaInstagram />
              <Link href="https://www.instagram.com/" target="_blank">
                Instagram
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:underline duration-200 cursor-pointer">
              <FaXTwitter />
              <Link href="https://x.com/" target="_blank">
                Twitter (X)
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:underline duration-200 cursor-pointer">
              <FaFacebook />
              <Link href="https://www.facebook.com/" target="_blank">
                Facebook
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:underline duration-200 cursor-pointer">
              <FaPinterest />
              <Link href="https://www.pinterest.com/" target="_blank">
                Pinterest
              </Link>
            </li>
          </ul>
        </section>

        {/* Donate */}
        <section className="p-5">
          <h1 className="text-lg font-medium my-3">Donate</h1>

          <p className="text-gray-700 my-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est,
            adipisci quibusdam.
          </p>
          <p>
            Feeling generous and would like to donate to our cause,{" "}
            <Link
              href="/donation"
              className="font-medium hover:underline duration-300"
            >
              Donate
            </Link>
          </p>
        </section>

        {/* Our Apps */}
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
      </div>

      <aside className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between px-10">
        <div className="flex items-center">
          {[
            { label: "Audio-Books" },
            { label: "Books" },
            { label: "Podcasts" },
          ].reduce<React.ReactNode[]>((acc, { label }, index, arr) => {
            acc.push(
              <p
                key={`link-${index}`}
                className="text-black text-sm font-normal hover:underline duration-300 whitespace-nowrap cursor-pointer"
              >
                {label}
              </p>
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
          <p className="text-sm font-normal whitespace-nowrap">
            Copyright &copy; {CurrentYear} SmartReads Inc.
          </p>
        </div>
      </aside>
    </footer>
  )
}

export default Footer

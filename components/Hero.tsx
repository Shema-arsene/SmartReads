import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import UserGreet from "./UserGreet"

export const metadata: Metadata = {
  title: "SmartReads",
  description: "SmartReads ebooks, audiobooks and podcasts",
  keywords: "books, ebooks, audiobooks, podcasts",
  twitter: {
    card: "summary_large_image",
    title: "About us | Business Name",
  },
}

const Hero = () => {

  return (
    <section className="w-full flex flex-col md:flex-row max-md:gap-7">
      <aside className="flex-1 flex flex-col items-start justify-center gap-5 px-10 md:pl-20">
        <UserGreet />
        <p className="my-3 text-lg">Ebooks, audiobooks, and so much more</p>
        <Link
          href="/"
          className="block w-fit border border-black bg-[#f28f3bff] text-white font-medium px-4 py-2 rounded-lg hover:opacity-70 duration-300"
        >
          Read free for 30 days
        </Link>
        <p>Only $9.99/month after trial. Cancel anytime.</p>
      </aside>
      <aside className="flex-1 px-5 sm:px-10">
        <Image
          className="h-full w-full object-center"
          src="https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg"
          alt="SmartReads_hero_image"
          width={180}
          height={389}
          priority
        />
      </aside>
    </section>
  )
}

export default Hero

import Hero from "@/components/Hero"
import Image from "next/image"
import Link from "next/link"
import { FaApple, FaGooglePlay } from "react-icons/fa6"

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <Hero />

      <section className="bg-[#c8553dff] w-full p-5 sm:p-10">
        <div className="text-white flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">
            The best
            <span className="bg-[#f28f3bff] text-black mx-2">stories</span>
          </h1>
          <h1 className="text-3xl font-bold my-3">
            are the ones
            <span className="bg-[#f28f3bff] text-black mx-2">you love</span>
          </h1>

          <p>Thousands of new titles every month.</p>
          <p>One convenient subscription.</p>
        </div>

        <div className="flex items-center overflow-x-auto"></div>
      </section>

      <section className="p-10"></section>

      <section className="p-10 w-full flex flex-col md:flex-row items-center justify-center max-md:gap-7">
        <aside className="flex-1 md:p-10 flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-normal">
              Read
              <span className="bg-[#f28f3bff] text-black mx-2">
                what you want,
              </span>
            </h1>
            <h1 className="text-3xl md:text-4xl font-normal my-3">
              how you want.
            </h1>
          </div>

          <p>Enjoy your library everywhere you go — even offline.</p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
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
        </aside>
        <aside className="flex-1 flex items-center justify-center p-10">
          <Image
            className="scale-150 md:scale-200"
            // src="https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg"
            src="https://assets.production.scribd.com/mfe-landing-pages/_next/static/media/everand_get_app_banner_2x.b95fa7db.webp"
            alt="SmartReads_hero_image"
            width={180}
            height={389}
            priority
          />
        </aside>
      </section>

      <section className="bg-[#ffd5c2ff] w-full flex flex-col items-center justify-center gap-5 p-10">
        <h1 className="text-5xl font-thin">Still curious?</h1>
        <p>Let’s get to know each other better.</p>
        <Link
          href="/about"
          className="bg-black text-white font-medium px-4 py-2 rounded-lg hover:opacity-70 duration-300"
        >
          Learn more about SmartReads
        </Link>
        <hr className="bg-gray-700 opacity-50 w-40" />
        <Link href="/faq" className="underline font-thin">
          Visit our FAQ.
        </Link>
      </section>
    </main>
  )
}

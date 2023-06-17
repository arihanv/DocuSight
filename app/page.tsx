import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8">
      <div className="flex flex-col items-center justify-center gap-2 w-full max-w-[950px] m-auto">
        <div className="flex flex-wrap-reverse justify-center md:justify-between w-full items-center border-b py-5">
          <div className="flex flex-col gap-4 max-w-[400px]">
            <h1 className="text-5xl font-extrabold leading-tight tracking-tighter md:text-7xl flex gap-3 items-center">
              DocuSight <Search size={40} /> <br className="hidden sm:inline" />
            </h1>
            <p className="">
              Upload and analyze your documents with ease through the power of
              AI.
            </p>
            <Link
              href={"/dashboard"}
              rel="noreferrer"
              className={buttonVariants()}
            >
              Get Started
            </Link>
          </div>
          <Image
            src="https://illustrations.popsy.co/green/idea-launch.svg"
            alt="student-going-to-school"
            className="dark:invert"
            height={400}
            width={400}
          ></Image>
        </div>
        <div className="flex-col flex flex-wrap-reverse justify-center w-full items-center border-b py-5 gap-2">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tighter flex gap-3 items-center">
            It&apos;s Simple
          </h1>
          <div className="flex gap-10">
            <div className="flex flex-col gap-1 items-center">
              <Image
                src="https://illustrations.popsy.co/green/work-from-home.svg"
                alt="student-going-to-school"
                className="dark:invert"
                height={250}
                width={250}
              ></Image>
              <div className="">Upload A PDF</div>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <Image
                src="https://illustrations.popsy.co/green/paper-documents.svg"
                alt="student-going-to-school"
                className="dark:invert"
                height={250}
                width={250}
              ></Image>
              <div className="">Chat With Our AI</div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Documentation
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link>
      </div> */}
    </section>
  )
}

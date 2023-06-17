import React from "react"

type Props = {}

const IndexPage = (props: Props) => {
  return (
    <section className="container grid items-center gap-6 pb-8 py-5 md:py-8">
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[950px] m-auto">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tighter md:text-7xl">Dashboard</h1>
        <div className="dark:bg-gray-900 bg-gray-100 w-full max-w-[700px] p-2.5 flex items-center justify-center h-[550px] rounded-xl">
          <div>
           Files
          </div>
        </div>
      </div>
    </section>
  )
}

export default IndexPage

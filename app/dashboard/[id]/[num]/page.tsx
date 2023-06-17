import React from "react"

import PdfViewer from "@/components/pdfViewer"

export default function viewer({
  params,
}: {
  params: {
    id: string
    num: string
  }
}) {
  return (
    <section className="m-auto grid max-w-[1200px] items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="grid grid-cols-[1.25fr,1fr] items-center justify-center gap-8">
        <div className="flex h-full w-fit flex-col gap-3">
          <div className="h-full max-w-3xl w-fit rounded-xl border border-gray-700 bg-white p-1 drop-shadow-xl dark:bg-black">
            <div className="h-full max-w-fit gap-2 rounded-lg border border-gray-700 bg-white dark:bg-black">
              {/*@ts-ignore*/}
              <PdfViewer id={params.id} num={params.num} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

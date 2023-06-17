"use client"
import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

type Props = {}

const IndexPage = (props: Props) => {
  const [files, setFiles] = React.useState({})
  const tFile = {
    name: "The way the world works",
    date: "10/10/2021",
    size: "3.4 mb",
  }

  React.useEffect(() => {
    // setFiles([tFile])
  }, [])

  return (
    <section className="container grid items-center gap-6 pb-8 py-5 md:py-8">
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[950px] m-auto">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tighter md:text-7xl">
          Dashboard
        </h1>
        <div className="dark:bg-gray-900 bg-gray-100 w-full max-w-[700px] p-2.5 flex items-center justify-center h-[550px] rounded-xl">
          <div className="bg-background grid p-2.5 rounded-lg w-full max-w-[200px] gap-1">
            {Object.keys(files).length !== 0 ? (
            <>
            <h1 className="text-lg font-semibold border-b py-1 leading-6 mb-1">
              The way the world works
            </h1>
            <div className="text-xs text-muted-foreground">
              Date uploaded: <span className="italic">10/10/2021</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Size: <span className="italic">3.4 mb</span>
            </div>
            </> ) : (
              <div className="text-lg font-semibold py-1 border-dashed border">
                No files uploaded
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default IndexPage

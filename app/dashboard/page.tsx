"use client"

import React from "react"
import { Loader2, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
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
  const [file, setFile] = React.useState({})
  const [modalOpen, setModalOpen] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [name, setName] = React.useState<string>("")

  const tFile = {
    name: "The way the world works",
    date: "10/10/2021",
    size: "3.4 mb",
  }


  React.useEffect(() => {
    console.log(file)
  }, [file])

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileUpload = (event: any) => {
    setModalOpen(true)
    setFile(event.target.files[0])
    console.log(event.target.files[0])
  }

  return (
    <section className="container grid items-center gap-6 pb-8 py-5 md:py-8">
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[950px] m-auto">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tighter md:text-7xl">
          Dashboard
        </h1>
        <div className="dark:bg-gray-900 bg-gray-100 w-full max-w-[700px] p-2.5 flex items-center justify-center h-[550px] rounded-xl">
          <div className="bg-background grid p-2.5 rounded-lg w-full max-w-[200px] gap-1">
            {Object.keys(file).length !== 0 ? (
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
              </>
            ) : (
              <div className="text-lg font-semibold py-1 border-dashed border border-gray-300 rounded-md">
                <Dialog open={modalOpen}>
                  <DialogTrigger asChild>
                    <div
                      onClick={handleButtonClick}
                      className="flex cursor-pointer items-center justify-center py-10 bg-opacity-40"
                    >
                      {uploading ? (
                        <div className="m-auto animate-spin text-gray-400 repeat-infinite dark:text-gray-600">
                          <Loader2 size={30} />
                        </div>
                      ) : (
                        <div className="text-gray-500 dark:text-gray-300">
                          <Upload />
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        style={{ display: "none" }}
                        onChange={handleFileUpload}
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Enter a name for the file</DialogTitle>
                      <DialogDescription>
                        <Input
                          className="focus-visible:ring-0"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter"}
                        />
                        <Button
                          className="mt-3"
                          // onClick={() => handleFileChange(name)}
                        >
                          Submit
                        </Button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default IndexPage

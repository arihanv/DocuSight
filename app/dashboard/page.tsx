"use client"

import React, { useEffect } from "react"
import { cloudDb, cloudStore } from "@/api/cloud"
import { encryptKey } from "@/api/utils"
import { useAuth } from "@clerk/nextjs"
import Cookie from "js-cookie"
import { Loader2, Trash, Upload } from "lucide-react"

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

import FileCard from "../../components/fileCard"

type Props = {}

const IndexPage = (props: Props) => {
  const [file, setFile] = React.useState<any>({})
  const [modalOpen, setModalOpen] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [name, setName] = React.useState<string>("")
  const [id, setId] = React.useState("")
  const { isLoaded, userId, sessionId, getToken } = useAuth()
  const [docInfo, setDocInfo] = React.useState<any>({})
  const [input, setInput] = React.useState<any>("")

  useEffect(() => {
    if (Cookie.get("key") != null) {
      setInput(Cookie.get("key"))
    }
  }, [input])

  async function exp() {
    if (id == "") return
    const res = await cloudDb.get(id)
    if (res == null) {
      cloudDb.put({ numDocs: 0 }, id)
    } else {
      setDocInfo(await cloudDb.get(id))
      console.log(await cloudDb.get(id))
    }
    console.log("done")
  }

  React.useEffect(() => {
    console.log(id)
    exp()
  }, [id])

  const handleFileChange = async (name: string) => {
    if (id == "") return
    if (name == "") return
    setModalOpen(false)
    const fileName = name
    const res = await cloudDb.get(id)
    if (res != null) {
      if (res.numDocs != null && (res.numDocs as number) > 2) {
        console.log("too many docs")
        return
      }
    }
    setUploading(true)
    const maxSize = 15 * 1024 * 1024
    if (res != null && file != null) {
      if (file && file.size <= maxSize && file.type === "application/pdf") {
        const reader = new FileReader()
        let missingDocNum = null

        for (let i = 0; i <= 2; i++) {
          const docNum = `docs${i}`
          if (!(docNum in res)) {
            missingDocNum = i
            break
          }
        }
        console.log(missingDocNum)

        const docNum = `docs${missingDocNum}`

        reader.onload = async () => {
          const fileData = reader.result

          if (typeof fileData === "string") {
            const buffer = Buffer.from(fileData, "binary")
            console.log("uploading file, please wait...")
            const driveFile = await cloudStore.put(`${id}/${docNum}.pdf`, {
              data: buffer,
            })
            const updatedDoc = {
              [`${docNum}`]: {
                name: fileName,
                path: `${id}/${docNum}.pdf`,
                date: new Date().toLocaleDateString(),
                size: file.size,
              },
              numDocs: cloudDb.util.increment(1),
            }
            await cloudDb.update(updatedDoc, id)
            console.log("File uploaded:", driveFile)
            window.location.reload()
          } else if (fileData instanceof ArrayBuffer) {
            const uint8Array = new Uint8Array(fileData)
            console.log("uploading file, please wait...")
            const driveFile = await cloudStore.put(`${id}/${docNum}.pdf`, {
              data: uint8Array,
            })
            const updatedDoc = {
              [`${docNum}`]: {
                name: fileName,
                path: `${id}/${docNum}.pdf`,
                date: new Date().toLocaleDateString(),
                size: file.size,
              },
              numDocs: cloudDb.util.increment(1),
            }
            await cloudDb.update(updatedDoc, id)
            console.log("File uploaded:", driveFile)
            window.location.reload()
          } else {
            console.log("Invalid file data format")
          }
        }
        reader.readAsArrayBuffer(file)
      } else {
        console.log("Invalid file")
      }
    }
  }

  React.useEffect(() => {
    if (userId) {
      console.log(encryptKey(userId, userId, 8))
      setId(encryptKey(userId, userId, 8))
    }
  }, [userId])

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
    setName(event.target.files[0].name)
    console.log(event.target.files[0])
  }

  if (!isLoaded || !userId) {
    return null
  }

  const send = (input: string) => {
    if (input == "" || input == Cookie.get("key")) return
    Cookie.set("key", input)
    setInput(input)
  }

  const handleDeleteKey = () => {
    Cookie.remove("key")
    setInput("")
  }

  return (
    <section className="container grid items-center gap-6 pb-8 py-5 md:py-8">
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[950px] m-auto">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tighter md:text-7xl">
          Dashboard
        </h1>
        <div id="anchor" className="flex rounded-lg bg-white p-2 dark:bg-black items-center gap-2">
          <Input
            className="focus-visible:ring-0"
            type="text"
            placeholder="Enter Open AI Key"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
          />
          <button onClick={() => handleDeleteKey()}>
          <Trash color="red" />
          </button>
        </div>
        <div className="dark:bg-gray-900 bg-gray-100 w-full max-w-[700px] p-2.5 flex items-center justify-center h-[550px] rounded-xl">
          <div className="bg-background grid p-2.5 max-w-[400px] rounded-lg gap-1 w-fit">
            {Object.keys(docInfo).length !== 0 && docInfo.numDocs ? (
              <div className="p-2">
                {Object.keys(docInfo).map((key) => {
                  if (key.substring(0, 4) == "docs") {
                    const doc = docInfo[key]
                    console.log(doc)
                    return (
                      <FileCard
                        name={doc.name}
                        path={doc.path}
                        date={doc.date}
                        size={doc.size}
                      />
                    )
                  }
                })}
              </div>
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
                          onClick={() => handleFileChange(name)}
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

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { cloudDb, cloudStore } from "@/api/cloud"
import { Loader2, Trash2 } from "lucide-react"
import Cookie from "js-cookie"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const FileCard = (props: any) => {
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)

  async function handleDelete() {
    setLoading(true)
    console.log(props.path.split("/")[1].split(".")[0])
    const docNum = props.path.split("/")[1].split(".")[0]
    const key = props.path.split("/")[0]
    const res = await cloudDb.get(props.path.split("/")[0])
    if (res !== null) {
      if (props.path) {
        await cloudStore.delete(props.path)
      }
      //   if (embeddedThumbPath) {
      //     await pdfStore.delete(embeddedThumbPath)
      //   }
      await cloudDb.update(
        { [docNum]: cloudDb.util.trim(), numDocs: (res.numDocs as number) - 1 },
        key
      )
    }
    window.location.reload()
  }

  const handleRedirect = () => {
    const id = Cookie.get("key")
    if(id == null){
        alert("Please enter your Open AI Key")
    } else {
        window.location.href = `/dashboard/${props.path}`
    }
  }

  return (
    <>
      <div className="relative flex flex-col">
        <button
          onClick={handleDelete}
          className="absolute -right-5 -top-5 rounded-xl bg-gray-200 p-2 text-red-600"
        >
          <Trash2 size={20} />
        </button>
        <button className="text-start" onClick={handleRedirect}>
          <div className="rounded-lg">
            {" "}
            {!loading ? (
              <>
                <h1 className="text-lg font-semibold border-b py-1 leading-6 mb-1">
                  {props.name}
                </h1>
                <div className="text-xs text-muted-foreground">
                  Date uploaded: <span className="italic">{props.date}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Size: <span className="italic">{props.size / 1000} kb</span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center rounded-lg rounded-b-none">
                <div className="animate-spin text-gray-400 repeat-infinite dark:text-gray-600">
                  <Loader2 size={30} />
                </div>
              </div>
            )}
          </div>
        </button>
      </div>
    </>
  )
}

export default FileCard

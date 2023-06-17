import { Deta } from "deta"

const deta = Deta(process.env.NEXT_PUBLIC_DETA as string)
const cloudStore = deta.Drive("PDF")
const cloudDb = deta.Base("PDFdb")

export { cloudStore, cloudDb }

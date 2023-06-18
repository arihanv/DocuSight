import Cookie from "js-cookie"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { MemoryVectorStore } from "langchain/vectorstores/memory"

import { cloudStore } from "./cloud"

async function getData(query: string) {
    // https://docs-1-a5187122.deta.app
  const url = `${process.env.DETA_URL}/splits?url=${encodeURIComponent(
    query
  )}`

  const res = await fetch(url)

  if (!res.ok) {
    console.error(await res.json())
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

async function checkExist(path: string) {
  try {
    const file = await cloudStore.get(path)
    if (file === null) return null
    const content = await file.text()
    const jsonData = JSON.parse(content)
    return jsonData
  } catch (error: any) {
    if (error.status === 404) {
      console.log("File does not exist:", path)
    } else {
      console.error("Error retrieving file:", error)
    }
  }
}

function cleanData(data: any) {
  const cleanedData = data.map((obj: any) => {
    const cleanedContent = obj.content.replace(/\n/g, "")
    const encodedContent = cleanedContent.replace(/[^\x00-\x7F]/g, "")
    return {
      content: encodedContent,
      embedding: obj.embedding,
      metadata: obj.metadata,
    }
  })
  return cleanedData
}

const generateFile = async (path: "string") => {
  const embed_path = path.replace(".pdf", "_embedding")
  console.log(embed_path)
  const loadDeta = await checkExist(embed_path)
  if (Cookie.get("key") == null) return null
  if (loadDeta !== null) {
    console.log("Already exists")
    const loadStore = await MemoryVectorStore.fromExistingIndex(
      new OpenAIEmbeddings({
        openAIApiKey: Cookie.get("key"),
      })
    )
    loadStore.memoryVectors = loadDeta
    return loadStore
  } else {
    console.log("Does not exist")
    const response = await getData(path)
    if (Object.keys(response).length === 0) return null
    const vectorStore = await MemoryVectorStore.fromTexts(
      response.text,
      response.meta,
      new OpenAIEmbeddings({
        openAIApiKey: Cookie.get("key"),
      })
    )
    await cloudStore.put(embed_path, {
      data: JSON.stringify(cleanData(vectorStore.memoryVectors)),
    })
    return vectorStore
  }
}

export { generateFile }

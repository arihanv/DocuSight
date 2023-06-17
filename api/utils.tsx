import seedrandom from "seedrandom"
function encryptKey(seed:string, sourceString:string, length:number) {
    const sr = seedrandom(seed)
    let encryptedStr = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(sr() * sourceString.length)
      encryptedStr += sourceString.charAt(randomIndex)
    }
    return encryptedStr
}
export {encryptKey}

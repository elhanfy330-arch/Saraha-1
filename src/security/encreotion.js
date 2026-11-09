import crypto, { Decipheriv } from "crypto"
import { DB_CONFIG } from "../config/config.service.js"

let { ENC_IV_LENGTH , ENC_KEY , ENC_ALGO } = DB_CONFIG
let key = Buffer.from(ENC_KEY,"hex")


export const encryption = async (plainText)=>{
    const iv = crypto.randomBytes(ENC_IV_LENGTH)
    let cipherIv = crypto.createCipheriv(ENC_ALGO ,key,iv)
    let result = cipherIv.update(plainText , "utf-8" , "hex")
    result += cipherIv.final("hex")
    return `${iv.toString("hex")}::${result}`
}

export const decryption = async(cypherText)=>{
    let [ivHex , encrypted] = cypherText.split("::")
    const iv = Buffer.from(ivHex,"hex")
    const desipherIv = crypto.createDecipheriv(ENC_ALGO , key , iv)
    let result = desipherIv.update(encrypted,"hex","utf-8")
    result += desipherIv.final("utf-8")
    return result;
}


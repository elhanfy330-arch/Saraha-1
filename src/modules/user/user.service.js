import mongoose from "mongoose"
import { userModel } from "../../database/models/user.model.js"
import { utils , enums } from "../../common/index.js"
import * as sec from "../../security/index.js"
import { hashEnum } from "../../common/enums/hash.js"
import jwt, { decode } from "jsonwebtoken"
import { DB_CONFIG } from "../../config/config.service.js"


export const profile = async(tocken)=>{
    // console.log(tocken)
    let {sub} = sec.jwt.verifyToken(tocken)
    let user = userModel.findById(sub)
    return user
}

export const update = async(tocken,data)=>{
    let {sub} = sec.jwt.verifyToken(tocken)
    let user =await userModel.findByIdAndUpdate(sub , data)
    return user
}


// export const login = async({email , password})=>{
//     let user = await userModel.findOne({email})
//     if (!user){
//         utils.exceptions.NotFoundException("User Not Found")
//     }
//     let matchedPassword = await sec.myCompare({encrypted : user.password , plainText : password , lib : hashEnum.argon })
//     if(!matchedPassword) utils.exceptions.NotFoundException("User Not Found")
//     let tocken = jwt.sign({sub : user.id},"mohamed_ali")
//     return tocken
// }
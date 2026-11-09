import { userModel } from "../../database/models/user.model.js"
import { utils } from "../../common/index.js"
import * as sec from "../../security/index.js"
import { createTokens } from "../../security/jwt.js"
import { hashEnum } from "../../common/enums/hash.js"
import jwt from "jsonwebtoken"
import { DB_CONFIG } from "../../config/config.service.js"


export const signup = async(data)=>{
    let user = await userModel.findOne({email : data.email})
    if (user){
        utils.exceptions.ConflictException("User Already exist")
    }
    let { role, ...safeData } = data
    safeData.password = await sec.myHash({ plainText: safeData.password })
    let result = await userModel.create(safeData)

    return result
}

export const login = async({email , password})=>{
    let user = await userModel.findOne({email})
    if (!user){
        utils.exceptions.NotFoundException("User Not Found")
    }

    let matchedPassword = await sec.myCompare({plainText : password , encrypted : user.password })
    if(!matchedPassword) utils.exceptions.NotFoundException("User Not Found")
    let tocken =sec.jwt.createTokens({
        paylod : {sub : user.id },
        options : {issuer : "MoahmedAli"},
        role : user.role
    })
    return tocken
}

export const rotateToken = async(user , payload)=>{


    let accessIat = payload.iat *1000
    let accessExpIn = DB_CONFIG.JWT_ACCESS_EXP *1000
    let accessExpAt = accessIat + accessExpIn
    let currentTime = Date.now()
    if(currentTime < accessExpAt ){
        utils.exceptions.ConflictException("Access Token is still active")
    }


    return createTokens({
        paylod : {sub : user.id },
        options : {issuer : "MoahmedAli"},
        role : user.role
    })
}
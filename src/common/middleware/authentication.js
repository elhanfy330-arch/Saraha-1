
import * as sec from "../../security/index.js"
import { userModel } from "../../database/models/user.model.js"
import { UnAuthorizedException, ForbiddenException, BadRequistException } from "../utils/exceptions.js"
import { enums } from "../index.js"



export const auth = ({tokenType = enums.tokenTypeEnum.ACCESS , roles = Object.values(enums.roleEnum)} = {})=>{
    return async (req,res,next)=>{
    let token = req.headers.authorization
    if(!token){
        UnAuthorizedException("token not provided")
    }

    let payload
    try{
        payload = sec.jwt.verifyToken({ token, tokenType })
    }catch(e){
        UnAuthorizedException("Invalid or expired token")
    }

    let user = await userModel.findById(payload.sub)
    if(!user){
        BadRequistException("User not found")
    }

    let userRole = user.role ?? enums.roleEnum.user
    if(userRole !== payload.role){
        UnAuthorizedException("Token is no longer valid, please login again")
    }
    if(!roles.includes(userRole)){
        ForbiddenException("You are not allowed to access this route")
    }

    req.user = user
    req.payload = payload
    next()
}
}
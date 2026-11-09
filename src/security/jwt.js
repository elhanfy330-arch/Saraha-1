
import jwt from "jsonwebtoken"
import { DB_CONFIG } from "../config/config.service.js"
import { enums } from "../common/index.js"
import { UnAuthorizedException } from "../common/utils/exceptions.js"


export const getRoleName = (role)=>{
    return Object.keys(enums.roleEnum).find(key => enums.roleEnum[key] === role)
}

const getRoleSecret = (role)=>{
    let secret
    switch(role){
        case enums.roleEnum.admin :
        secret = {
            access : DB_CONFIG.JWT_ACCESS_ADMIN_SECRET,
            refresh : DB_CONFIG.JWT_REFRESH_ADMIN_SECRET
        }
        break;
        default :
        secret = {
            access : DB_CONFIG.JWT_ACCESS_USER_SECRET,
            refresh : DB_CONFIG.JWT_REFRESH_USER_SECRET
        }
        break;
    }
    return secret
}

const getsecret = ({tokenType , role = enums.roleEnum.user})=>{
    let secret = getRoleSecret(role)
    return tokenType === enums.tokenTypeEnum.REFRESH ? secret.refresh : secret.access
}

export const createToken = ({ paylod = {}, options = {}, secret} = {}) => {
    return jwt.sign(paylod ,secret , options )
}

export const createTokens = ({paylod = {}, options = {} , role = enums.roleEnum.user} = {})=>{
    let secret = getRoleSecret(role)
    let audience = getRoleName(role)
    console.log("aud" , audience)


    const accessToken = createToken({
        paylod , options : {
            ...options , audience , expiresIn : DB_CONFIG.JWT_ACCESS_EXP
        } , secret : secret.access
    })


    const refreshToken = createToken({
        paylod , options : {
            ...options , audience , expiresIn : DB_CONFIG.JWT_REFRESH_EXP
        } , secret : secret.refresh
    })
    return { accessToken, refreshToken }
}

export const verifyToken = ({token, tokenType = enums.tokenTypeEnum.ACCESS}) => {
    let decoded = jwt.decode(token)
    console.log(decoded)
    let aud = Array.isArray(decoded?.aud) ? decoded.aud[0] : decoded?.aud
    let role = enums.roleEnum[aud]
    console.log(role , aud)
    if(role === undefined){
        UnAuthorizedException("Invalid token")
    }
    let payload = jwt.verify(token, getsecret({tokenType , role}))
    return { ...payload, role }
}

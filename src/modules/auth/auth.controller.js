import { Router } from "express";
import { utils } from "../../common/index.js";
import *as srevice from "./auth.srevice.js"
import {enums , middleware} from "../../common/index.js"
export let authRouter = Router()

authRouter.post("/signup",async (req,res)=>{
    let data = await srevice.signup(req.body)
    utils.response({res,data,message : "User Created Successfully" , status : 201})
})

authRouter.post("/login",async (req,res)=>{
    let data = await srevice.login(req.body)
    utils.response({res,data,message : "Logged Done" , status : 201})
})

authRouter.post("/rotate-token", middleware.auth({tokenType : enums.tokenTypeEnum.REFRESH}) ,async (req,res)=>{
    let data = await srevice.rotateToken(req.user , req.payload)
    utils.response({res,data ,message : "user fetched"})
})
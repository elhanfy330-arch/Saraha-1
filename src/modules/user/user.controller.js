import { Router } from "express";
import *as Srevice from "./user.service.js"
import { utils ,enums } from "../../common/index.js";
import { auth } from "../../common/middleware/authentication.js";

export let userRouter = Router()

userRouter.get("/profile", auth({tokenType : enums.tokenTypeEnum.ACCESS}) ,async (req,res)=>{
    utils.response({res,data : req.user ,message : "user fetched"})
})



// userRouter.post("/login",async (req,res)=>{
//     let data = await srevice.login(req.body)
//     utils.response({res,data,message : "Logged Done" , status : 201})
// })
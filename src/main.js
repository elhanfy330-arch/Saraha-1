import express from "express"
import { DB_CONFIG } from "./config/config.service.js"
import { DB_CONNECT } from "./database/connection.js"
import* as Router from "./modules/index.js"
import { middleware } from "./common/index.js"
import crypto from "node:crypto"
let PORT = DB_CONFIG.PORT
let app = express()
app.use(express.json())

await DB_CONNECT()

app.use("/auth" , Router.authRouter)
app.use("/user" , Router.userRouter)

let key = crypto.randomBytes(32).toString("hex")
// console.log(key)


app.use(middleware.errorHandeller)
app.listen(PORT , ()=>{
    console.log("server listen on port",PORT)
})
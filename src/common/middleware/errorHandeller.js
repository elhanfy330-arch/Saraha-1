export const errorHandeller=(err,req,res,next)=>{
    const status = typeof err.cause === "number" ? err.cause : 500
    console.log(err)
    res.status(status).json({
        message : err.message || "Internal Server Error",
        stack : process.env.NODE_ENV === "development" ? err.stack : undefined
    })
}

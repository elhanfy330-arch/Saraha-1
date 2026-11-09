export const response = ({res , data , message , status=200})=>{
    res.status(status).json({
        message,
        data
    })
}
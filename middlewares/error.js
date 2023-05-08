export const errorMiddleware = (err,req,res,next)=>{
    err.message = err.message || "Internal server error"
    return res.status(404).json({
        sucess: false,
        message:  err.message,
    })
}
export default errorMiddleware;
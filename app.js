import express from 'express'
import mongoose from "mongoose"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import cookieParser from "cookie-parser"
import { config} from "dotenv";
import errorMiddleware from "./middlewares/error.js"
import cors from 'cors'
const router = express.Router()
config({
    path: "./data/config.env",
})
// const users=[]
export const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
}))
///using routes
app.use("/api/v1/users",userRouter)
app.use("/api/v1/tasks", taskRouter)
 


app.get("/",(req,res)=>{
    res.send("nice working")
})

//midddleware for error handling
app.use(errorMiddleware)

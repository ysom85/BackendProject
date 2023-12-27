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
app.use(cors({ origin: true }))
///using routes
app.use("/api/v1/users",userRouter)
app.use("/api/v1/tasks", taskRouter)
 


app.get("/",(req,res)=>{
    res.send([{"id":1,"name":"tracklist-1"},{"id":2,"name":"tracklist-2"},{"id":3,"name":"tracklist-3"},{"id":4,"name":"tracklist-4"},{"id":4,"name":"tracklist-4"}])
})

//midddleware for error handling
app.use(errorMiddleware)

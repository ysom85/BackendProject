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
 
app.get("/2",(req,res)=>{
    res.send([
         {
        "item_id": "_DVs8XyIk",
        "product_name": "PG13.5 Cable Gland White 9-12mm Dia",
        "package_id": "VxnnZzizt",
        "quantity": 2,
        "threshold_quantity": 3
    },
    {
        "item_id": "_8aAi4HTH",
        "product_name": "470pf 50v Ceramic",
        "package_id": "X6ANoUNj9",
        "quantity": 13,
        "threshold_quantity": 3
    },
    {
        "item_id": "_pxFGMgDU",
        "product_name": "1M OHM",
        "package_id": "Gr6cDqrFU",
        "quantity": 20,
        "threshold_quantity": 5
    },
   
])
})
app.get("/",(req,res)=>{
    res.send([{"id":1,"name":"tracklist-1"},{"id":2,"name":"tracklist-2"},{"id":3,"name":"tracklist-3"},{"id":4,"name":"tracklist-4"},{"id":4,"name":"tracklist-4"}])
})

app.get("/1",(req,res)=>{
    res.send([
    {
        "item_id": "_8aAi4HTH",
        "product_name": "470pf 50v Ceramic",
        "package_id": "X6ANoUNj9",
        "quantity": 13,
        "threshold_quantity": 3
    },
    {
        "item_id": "_pxFGMgDU",
        "product_name": "1M OHM",
        "package_id": "Gr6cDqrFU",
        "quantity": 20,
        "threshold_quantity": 5
    },
    {
        "item_id": "_DVs8XyIk",
        "product_name": "PG13.5 Cable Gland White 9-12mm Dia",
        "package_id": "VxnnZzizt",
        "quantity": 2,
        "threshold_quantity": 3
    }
])
})

//midddleware for error handling
app.use(errorMiddleware)

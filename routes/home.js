import express from 'express'
import home123 from "../controllers/home.js"
const router = express.Router()
router.get("/home",home123)

export default router
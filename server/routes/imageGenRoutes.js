import express from "express"
import generateImage from "../controllers/imageGenController.js"
import protect from "../middleware/authMiddleware.js"


const router = express.Router()

router.post("/generate" , protect.forUser , generateImage )






export default router
import express from "express"
import protect from "../middleware/authMiddleware.js"
import postController from "../controllers/postController.js"


import savePostController from "../controllers/savePostController.js"

const router = express.Router({mergeParams : true})

router.get("/" , protect.forUser , postController.getPosts)
router.post("/" , protect.forUser , postController.generateAndPost)
router.get("/:pid" , protect.forUser , postController.getPost)
router.put("/:pid" , protect.forUser , postController.likeAndUnlikePost)



// Save Post Routes
router.post("/:pid/save" , protect.forUser, savePostController.savePost)




export default router
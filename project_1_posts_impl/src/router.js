import Router from 'express'
import PostController from "./controllers/PostController.js";

const router = new Router()

router.post('/posts',  PostController.create)
router.get('/posts', PostController.getAll)
router.get('/post/:id',  PostController.getOne)
router.put('/posts', PostController.update)
router.delete('/post/:id', PostController.delete)

export default router
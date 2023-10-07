import express from 'express'
import LikeController from './likes.controller.js'
const LikesRouter = express.Router()
const likeController = new LikeController()
LikesRouter.post("/", (req, res, next) => {
    likeController.likeItem(req, res, next)
})
LikesRouter.get("/", (req, res, next) => {
    likeController.getLikes(req, res, next)
})
export default LikesRouter
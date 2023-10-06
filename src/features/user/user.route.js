import { UsersController } from "./user.controller.js";
import express from 'express'
const userRouter = express.Router()

const userController = new UsersController()

userRouter.post('/signin', (req, res)=>userController.signIn(req, res))
userRouter.post('/signup', (req, res, next) => {
    userController.signUp(req, res, next)
})
userRouter.post('/resetpassword', (req, res) => {
    userController.resetPassword(req, res)
})

export default userRouter
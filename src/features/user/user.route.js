import { UsersController } from "./user.controller.js";
import express from 'express'
const userRouter = express.Router()

const userController = new UsersController()

userRouter.post('/signin', userController.signIn)
userRouter.post('/signup', userController.signUp)

export default userRouter
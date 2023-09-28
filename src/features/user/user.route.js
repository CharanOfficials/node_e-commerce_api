import { UsersController } from "./user.controller.js";
import express from 'express'
const userRouter = express.Router()

const userController = new UsersController()

userRouter.post('/signin', (req, res)=>userController.signIn(req, res))
userRouter.post('/signup', (req, res) => {
    userController.signUp(req, res)
})

export default userRouter
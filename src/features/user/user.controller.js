import UserModel from "./user.model.js"
import jwt from 'jsonwebtoken'
import env from '../../env.js'
export class UsersController{
    signUp(req, res) {
        const { name, email, password, type } = req.body
        const newUser = UserModel.signUp(name, email, password, type)
        res.status(201).send(newUser)
    }
    signIn(req, res) {
        const validUser = UserModel.signIn(req.body.email, req.body.password, req.body.type)
        if (!validUser) {
            res.status(400).send("Invalid Credentials")
        } else {
            const token = jwt.sign({
            userId: validUser.id,
            userEmail: validUser.email,
            userType:validUser.type
            }, env.jwtSecret,
                {
                    expiresIn:"1h"
                }
            )
            res.status(200).send(token)
        }
    }
}
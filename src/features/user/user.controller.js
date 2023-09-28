import UserModel from "./user.model.js"
import jwt from 'jsonwebtoken'
import env from '../../env.js'
import { ApplicaationError } from "../../../error-handler/applicationError.js"
import UserRepository from "./user.repository.js"

export class UsersController{
    constructor() {
        this.userRepository = new UserRepository()
    }
    async signUp(req, res) {
        try {
            const { name, email, password, type } = req.body
            const newUser = new UserModel(name, email, password, type)
            await this.userRepository.signUp(newUser)
            res.status(201).send("User successfully created")
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong", 500)
        }
    }
    async signIn(req, res) {
        try {
            const validUser = await this.userRepository.signIn(req.body.email, req.body.password, req.body.type)
            if (!validUser) {
                res.status(400).send("Invalid Credentials")
            } else {
                const token = jwt.sign({
                    userId: validUser.id,
                    userEmail: validUser.email,
                    userType: validUser.type
                }, env.jwtSecret,
                    {
                        expiresIn: "1h"
                    }
                )
                res.status(200).send(token)
            }
        }catch(err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong", 500)
        }} 
}
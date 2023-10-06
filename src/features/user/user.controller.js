import UserModel from "./user.model.js"
import jwt from 'jsonwebtoken'
import { ApplicaationError } from "../../../error-handler/applicationError.js"
import UserRepository from "./user.repository.js"
import bcrypt from 'bcrypt'

export class UsersController{
    constructor() {
        this.userRepository = new UserRepository()
    }
    async resetPassword(req, res) {
        const { newPassword, email } = req.body
        const hashedPassword = await bcrypt.hash(newPassword, 12)
        const userId = req.userID
        try {
            await this.userRepository.resetPassword(email, hashedPassword)
            res.status(200).send("Password is updated")
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong with database", 500)
        }
    }
    async signUp(req, res, next) {
        try {
            const { name, email, password, type } = req.body
            // const hashedPassword = await bcrypt.hash(password, 12)
            const newUser = new UserModel(name, email, password, type)
            await this.userRepository.signUp(newUser)
            res.status(201).send("User successfully created")
        } catch (err) {
            next(err)
            // console.log(err)
            // throw new ApplicaationError("Something went wrong", 500)
        }
    }
    async signIn(req, res) {
        try {
            const validUser = await this.userRepository.findByEmail(req.body.email, req.body.type) 
            if (!validUser) {
                res.status(400).send("Invalid Credentials User")
            } else {
                const result = await bcrypt.compare(req.body.password, validUser.password)
                if (result) {
                    const token = jwt.sign({
                        userId: validUser._id,
                        userEmail: validUser.email,
                        userType: validUser.type
                    }, process.env.JWT_SECRET,
                        {
                            expiresIn: "1h"
                        }
                    )
                    res.status(200).send(token)
                } else {
                    res.status(400).send("Invalid Credentials")
                }}
            }
        catch(err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong", 500)
        }} 
}
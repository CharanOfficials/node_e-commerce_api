import { UserModel } from "./user.model.js"
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
            res.status(200).send("Login successful")
        }
    }
}
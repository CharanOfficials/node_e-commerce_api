import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicaationError } from "../../../error-handler/applicationError.js";
// Create model from schema
const UserModel = mongoose.model('User', userSchema)

export default class UserRepository{
    async resetPassword(email, hashedPassword) {
        try {
            let user = await UserModel.findOneAndUpdate({ email }, { password: hashedPassword })
            console.log(user)
            if (!user) {
                throw new ApplicaationError("No such user", 400)
            }
        }catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong with database", 500)
        }
    }
    async signUp(user){
        // Create instance of Model
        try {
            const newUser = new UserModel(user)
            await newUser.save(user)
            return newUser
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                throw err
            } else {
                console.log(err)
                throw new ApplicaationError("Something went wrong with database", 500)   
            }
        }
    }
    async signIn(email, password, type) {
        try {
            await UserModel.findOne({email, password, type})
        }catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong with database", 500)
        }
    }
    async findByEmail(email, type) {
        try {
            return await UserModel.findOne({email, type})
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wromg with database", 500)
        }
    }
}
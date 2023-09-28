import { getDB } from "../../config/mongodb.js"
import { ApplicaationError } from "../../../error-handler/applicationError.js"
class UserRepository{
    async signUp(newUser) {
        try {
            const db = getDB()
            const collection = db.collection("users")
            await collection.insertOne(newUser)
            return newUser
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wromg with database", 500)
        }
    }
    async signIn(email, password, type) {
        try {
            const db = getDB()
            const collection = db.collection("users")
            return await collection.findOne({email, password, type})
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wromg with database", 500)
        }
    }
}
export default UserRepository
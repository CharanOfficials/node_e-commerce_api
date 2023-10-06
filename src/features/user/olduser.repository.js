import { getDB } from "../../config/mongodb.js"
import { ApplicaationError } from "../../../error-handler/applicationError.js"
import { ObjectId } from "mongodb"
class UserRepository{
    constructor() {
        this.collection = "users"
    }
    async signUp(newUser) {
        try {
            const db = getDB()
            const collection = db.collection(this.collection)
            const email = newUser.email
            const result = await collection.findOne({email:email})
            if (result) {
                throw new ApplicaationError("User already has an account", 400)
            }
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
            const collection = db.collection(this.collection)
            return await collection.findOne({email, password, type})
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wromg with database", 500)
        }
    }
    async findByEmail(email, type) {
        try {
            const db = getDB()
            const collection = db.collection(this.collection)
            return await collection.findOne({email, type})
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wromg with database", 500)
        }
    }
    async getAllUsers() {
        try {
            const db = getDB()
            const collection = db.collection(this.collection)
            return await collection.find({})
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wromg with database", 500)
        }
    }
    async getOneUser(id, email) {
        try {
            const db = getDB()
            const collection = db.collection(this.collection)
            if (id) { return await collection.findOne({ _id: new ObjectId(id) }) }
            else{return await collection.findOne({email: new ObjectId(email)})}
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wromg with database", 500)
        }
    }
}
export default UserRepository
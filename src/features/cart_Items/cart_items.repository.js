import User from "../user/user.repository.js"
import { getDB } from "../../config/mongodb.js"
import { ApplicaationError } from "../../../error-handler/applicationError.js"
import { ObjectId } from "mongodb"

import Product from '../product/product.repository.js'
class CartRepository{
    constructor(){
        this.collection = "cartItems"
        this.user = new User()        
        this.product = new Product()
    }
    async add(userID, productID, quantity) {
        try {
            quantity = Number(quantity)
            const db = getDB()
            const collection = db.collection(this.collection)
            // check user
            const user = await this.user.getOneUser(userID)
            if (!user) {
                throw new ApplicaationError("User not found", 400)
            }
            // check product
            const prod = await this.product.getOne(productID)
            if (!prod) {
                throw new ApplicaationError("Product not found", 400)
            }
            // Update only if now existing record is present
            const isProductExist = await collection.findOne({ product_id: new ObjectId(productID) })
            let id
            if (!isProductExist) {
                id = await this.getNextCounter(db) // generate id
            }
            // If document then update else add
            return await collection.updateOne(
                { user_id: new ObjectId(userID), product_id: new ObjectId(productID) },
                {
                    $setOnInsert: { _id: id }, //set custom idon insert only
                    $inc: { quantity }
                },
                { upsert: true })
        }catch(err){
            console.log(err)
            throw new ApplicaationError("Something went wrong with database", 500)
        }
    }
    async getCartItems(userID) {
        try {
            const db = getDB()
            const collection = db.collection(this.collection)
            const user = await this.user.getOneUser(userID)
            if (!user) {
                throw new ApplicaationError("User not found", 400)
            }
            return await collection.find({user_id:new ObjectId(userID)}).toArray()
        }catch(err){
            console.log(err)
            throw new ApplicaationError("Something went wrong with database", 500)
        }       
    }
    async delete(cartItemID, userID) {
        try {
            const db = getDB()
            const collection = db.collection(this.collection)
            const result = await collection.deleteOne({ user_id: new ObjectId(userID), _id: new ObjectId(cartItemID) })
            return result.deletedCount>0
        }catch(err){
            console.log(err)
            throw new ApplicaationError("Something went wrong with database", 500)
        }
    }
    // generate custom id
    async getNextCounter(db) {
        const resultDocument = await db.collection("counters").findOneAndUpdate({ _id: "cartItemsId" }, { $inc: { value: 1 } }, { returnDocument: 'after' })
        return resultDocument.value
    }
}

export default CartRepository
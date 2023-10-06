import { ObjectId } from "mongodb"
import { ApplicaationError } from "../../../error-handler/applicationError.js"
import { getDB } from "../../config/mongodb.js"
import User from '../user/user.repository.js'
import mongoose from "mongoose"
import { productSchema } from "./product.schema.js"
import { reviewSchema } from "./reviews.schema.js"

const ProductModel = mongoose.model("Product", productSchema)
const ReviewModel = mongoose.model("Review", reviewSchema)
class ProductRepository{
    constructor() {
        this.collection = "products"
        this.user = new User()
    }
    async add(newProduct) {
        try {
            const db = getDB()
            const collection = db.collection(this.collection)
            await collection.insertOne(newProduct)
            return newProduct
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong with database", 500)
        }
    }
    async getAll() {
        try {
            const db = getDB()
            const collection = db.collection(this.collection)
            return await collection.find().toArray()
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong with database", 500)
        }
    }
    async getOne(id) {
        try {
            const db = getDB()
            const collection = db.collection(this.collection)
            return await collection.findOne({_id:new ObjectId(id)})
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong with database", 500)
        }
    }
    async filterProducts(minPrice, categories, category="", maxPrice=0) {
        try {
            const db = getDB()
            // To parse categories
            categories = JSON.parse(categories.replace(/'/g, '"'))
            const collection = db.collection(this.collection)
            let filterExpression = {}
            if (minPrice) {
                filterExpression.price = {$gte:parseFloat(minPrice)}
            }
            // if (maxPrice) {
            //     filterExpression.price = {...filterExpression.price, $lte:parseFloat(maxPrice)}
            // }
            if (categories) {
                filterExpression = { $and: [{ category: {$in:categories} },filterExpression]}
                // filterExpression.category = category
            }
            return await collection.find(filterExpression).project({name:1, desc:1, _id:0, ratings:1,ratings:{$slice:-1}}).toArray()
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong with database", 500)
        }
    }
    async rateProduct(userID, productID, rating) {
        try {
            // 1. check if product exist
            let productToUpdate = await ProductModel.findById(productID)
            if (!productToUpdate) {
                throw new Error("Product not found")
            }
            // Find the existing review
            const userReview = await ReviewModel.findOneAndUpdate({ 'product': productID, 'user': userID },{rating:rating})
            if (!userReview) {
                const newReview = new ReviewModel({
                    product: productID,
                    user: userID,
                    rating: rating
                })
                newReview.save()
                productToUpdate.reviews = newReview
                productToUpdate.save()
            }

            // const db = getDB()
            // const collection = db.collection(this.collection)
            // const result = await this.user.getOneUser(userID)
            // if (!result) {
            //     throw new ApplicaationError("User not found", 400)
            // }
            // // Remove any existing rating
            // await collection.updateOne({
            //     _id:new ObjectId(productID)
            // }, {
            //     $pull:{ratings:{userID:new ObjectId(userID)}}
            // })
            // // Add a new product
            // await collection.updateOne({
            //     _id: new ObjectId(productID)
            // }, {
            //     $push: { ratings: { userID: new ObjectId(userID), rating } }
            // })
            
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong with database", 500)
        }
    }
    async averageProductPricePerCategory(){
        try {
            const db = getDB()
            return await db.collection(this.collection).aggregate([
                {
                    $group: {
                        _id: "$category",
                        averagePrice:{$avg:"$price"}
                    }
                }
            ]).toArray()
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong with database", 500)
        }
    }
}
export default ProductRepository
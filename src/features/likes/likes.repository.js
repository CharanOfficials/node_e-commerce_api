import mongoose from "mongoose"
import { likesSchema } from "./likes.schema.js"
const LikeModel = mongoose.model("Like", likesSchema)
import { ApplicaationError } from "../../../error-handler/applicationError.js"
export default class LikesRepository{
    async getLikes(type, id) {
        const result = await LikeModel.find({
            likeable: id,
            on_model:type
        })
            .populate('user')
            .populate({ path: 'likeable', on_model: type })
        return result
    }
    async likeProduct(userId, productId) {
        try {
            const newLike = await LikeModel.findOneAndUpdate({user: userId, likeable: productId,on_model:'Product'},{
                user: userId,
                likeable: productId,
                on_model:'Product'
            }, { upsert: true})
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong with databases")
        }
    }
    async likeCategory(userId, categoryId) {
        try {
            const newLike = await LikeModel.findOneAndUpdate({user: userId, likeable: categoryId,on_model:'Category'},{
                user: userId,
                likeable: categoryId,
                on_model:'Category'
            }, { upsert: true, new: true })
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong with databases")
        }
    }
}
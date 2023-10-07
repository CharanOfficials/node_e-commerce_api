import LikesRepository from "./likes.repository.js"
import { ApplicaationError } from "../../../error-handler/applicationError.js"

export default class LikeController {
    constructor() {
        this.likeRepository = new LikesRepository()
    }
    async getLikes(req, res) {
        try {
            const { id, type } = req.body 
            const likes = await this.likeRepository.getLikes(type, id)
            return res.status(200).send(likes)
        }catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong with databases")
        }
    }
    async likeItem(req, res) {
        try {
            const {id, type} = req.body
            if (type !== 'Product' && type !== 'Category') {
                return res.status(400).send("Invalid Category")
            }
            if (type === 'Product') {
                await this.likeRepository.likeProduct(req.userID, id)
            }
            if (type === 'Category') {
                await this.likeRepository.likeCategory(req.userID, id)
            }
            res.status(200).json({success:true, message:"Liked"})
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong with databases")
        }
    }
}
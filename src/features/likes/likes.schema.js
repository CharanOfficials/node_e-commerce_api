import mongoose from "mongoose"

export const likesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'on_model',
    },
    on_model: {
        type: String,
        enum:['Product', 'Category']
    }
}).pre('findOneAndUpdate', (next) => {
    console.log("New Like coming in")
    next()
}).post('findOneAndUpdate', (doc) => {
    console.log("Like is updated")
    console.log(doc)
})
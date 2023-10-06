import mongoose, { Schema } from "mongoose";
export const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    desc: {
        type: String,
        required:true
    },
    imageUrl: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    category: {
        type: String,
        required:true
    },
    sizes: {
        type: Array,
        required: true,
        default:[]
    },
    inStock: {
        type: Array,
        required: true,
        default:[]
    },
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }
})
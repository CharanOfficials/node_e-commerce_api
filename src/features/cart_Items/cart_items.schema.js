import mongoose,{Schema} from "mongoose";
const cartItemsSchema = new Schema({
    productId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    quantity: {
        type: Number,
        required:true
    }
})
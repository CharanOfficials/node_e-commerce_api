import mongoose from 'mongoose'
import { categorySchema } from '../features/product/category.schema.js'
export const connectUsingMongoose = async () => {
    {
    try {
        await mongoose.connect(process.env.DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser:true
        })
        console.log("MongoDB connected using Mongoose.")
        addCategories()
    } catch (err) {
        console.error("Error  while connecting to DB", err)
    }}
}
async function addCategories() {
    const CategoryModel = mongoose.model('Category', categorySchema)
    const categories = await CategoryModel.find()
    if (!categories || categories.length === 0) {
        await CategoryModel.insertMany([{name:'Books'}, {name:"Clothing"}, {name:"Electronics"}])
    }
    console.log("Categories added.")
}
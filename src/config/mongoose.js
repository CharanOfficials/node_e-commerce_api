import mongoose from 'mongoose'
export const connectUsingMongoose = async () => {
    {
    try {
        await mongoose.connect(process.env.DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser:true
        })
        console.log("MongoDB connected using Mongoose.")
    } catch (err) {
        console.error("Error  while connecting to DB", err)
    }
}}
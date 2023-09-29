import { MongoClient } from 'mongodb'

let client
export const connectToMongoDB = async () => {
    try {
        const clientInstance = await MongoClient.connect(process.env.DB_URL)
        if (clientInstance) {
            // create instance to be returned
            client = clientInstance
            console.log("MongoDB is connected")
            createCounter(client.db()) // Call increment counter
            createIndexes(client.db()) // Call to create indexing
        }    
    } catch (err) {
        console.log("Unable to connect with DB", err)
    }
}
// Return db instance
export const getDB = () => {
    return client.db()
}
// Create a custom id
const createCounter = async (db) => {
    const existingCounter = await db.collection('counters').findOne({ _id: "cartItemsId" })
    if (!existingCounter) {
        await db.collection("counters").insertOne({_id:"cartItemsId", value:0})
    }
}
// Create indexes
const createIndexes = async (db) => {
    try {
        await db.collection("products").createIndex({ "price": 1 });
        await db.collection("products").createIndex({ "name": 1, category: -1 });
        await db.collection("products").createIndex({ "desc": "text" });
    } catch (err) {
        console.error("Error creating indexes:", err);
    }
};
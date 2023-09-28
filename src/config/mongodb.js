import { MongoClient } from 'mongodb'
const url = 'mongodb://127.0.0.1:27017/basicBookShop'

let client
export const connectToMongoDB = async () => {
    try {
        const clientInstance = await MongoClient.connect(url)
        if (clientInstance) {
            // create instance to be returned
            client = clientInstance
            console.log("MongoDB is connected")
        }    
    } catch (err) {
        console.log("Unable to connect with DB", err)
    }
}
// Return db instance
export const getDB = () => {
    return client.db()
}
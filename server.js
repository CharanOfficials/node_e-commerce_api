import express from 'express'
import ProductRouter from './src/features/product/controllers/product_routes.js'
import bodyParser from 'body-parser'
// Creating server
const server = express()

server.use(bodyParser.json())
//  for all the requests related to product, redirect to product routes.
server.use("/api/products", ProductRouter)

// responding home requests
server.get("/", (req, res) => {
    res.send("Welcome to e-commerce APIs")
})
//  listening to port
server.listen(3100, ()=> {
    console.log("Server is up")
})
import express from 'express'
import ProductRouter from './src/features/product/controllers/product_routes.js'
import UserRouter from './src/features/user/user.route.js'
import basicAuthorizer from './src/middleware/basicauth.middleware.js'
// Creating server
const server = express()
server.use(express.json())
//  for all the requests related to product, redirect to product routes.
server.use("/api/products",basicAuthorizer, ProductRouter)
// responding home requests
server.get("/", (req, res) => {
    res.send("Welcome to e-commerce APIs")
})
server.use('/api/users', UserRouter)
//  listening to port
server.listen(3100, ()=> {
    console.log("Server is up")
})
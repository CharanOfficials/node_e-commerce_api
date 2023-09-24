import swagger from 'swagger-ui-express'
import cors from 'cors'
import express from 'express'
import ProductRouter from './src/features/product/product_routes.js'
import UserRouter from './src/features/user/user.route.js'
import apiDocs from './swagger.json' assert {type: 'json'}
import logger from './src/middleware/logger.middleware.js'
// import basicAuthorizer from './src/middleware/basicauth.middleware.js'
import jwtauth from './src/middleware/jwt.middleware.js'
import CartRouter from './src/features/cart_Items/cart_items.router.js'
// Creating server
const server = express()

// CORS policy configuration for server to allow below client
// Pass second paarameter as * to allow all
// Preflight error is because we have a Authorization header
// // Preflight is a request sent by the client to the server to check the resource access authorization
var corsOptions = {
    origin:'http://localhost:5500'
}
server.use(cors(corsOptions))
// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', "http://localhost:5500")
//     res.header('Access-Control-Allow-Headers', "*") // To allow against Authorization in header
//     res.header('Access-Control-Allow-Methods', "*") // To allow POST etc. all the methods
//     // return ok for preflight request
//     if (req.method == "OPTIONS") {
//         return res.sendStatus(200)
//     }
//     next()
// })

server.use('/api/docs', swagger.serve, swagger.setup(apiDocs))
server.use(express.json())
//  for all the requests related to product, redirect to product routes after authentication.
// server.use("/api/products",basicAuthorizer, ProductRouter)
// After jwt authentication
server.use(logger) // Sending data using JSON parser for logging
server.use("/api/products", jwtauth, ProductRouter)
// responding home requests
server.get("/", (req, res) => {
    res.send("Welcome to e-commerce APIs")
})
server.use('/api/users', UserRouter)
server.use('/api/cartItems', jwtauth, CartRouter)
// Default request handler
server.use((req, res) => {
    res.status(404).send("API not found. Please check our documentation for more information at /api/docs")
})
//  listening to port
server.listen(3100, ()=> {
    console.log("Server is up")
})
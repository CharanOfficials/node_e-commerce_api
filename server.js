import express from 'express'
import ProductRouter from './src/features/product/product_routes.js'
import UserRouter from './src/features/user/user.route.js'
// import basicAuthorizer from './src/middleware/basicauth.middleware.js'
import jwtauth from './src/middleware/jwt.middleware.js'
import CartRouter from './src/features/cart_Items/cart_items.router.js'
// Creating server
const server = express()
server.use(express.json())
//  for all the requests related to product, redirect to product routes after authentication.
// server.use("/api/products",basicAuthorizer, ProductRouter)
// After jwt authentication
server.use("/api/products", jwtauth, ProductRouter)
// responding home requests
server.get("/", (req, res) => {
    res.send("Welcome to e-commerce APIs")
})
server.use('/api/users', UserRouter)
server.use('/api/cartItems', jwtauth,CartRouter)
//  listening to port
server.listen(3100, ()=> {
    console.log("Server is up")
})
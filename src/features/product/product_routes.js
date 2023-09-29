//  Manage routes/ paths to Product Controllers
// import router from express
import express from 'express'
import ProductController from './product_controller.js'
import { upload } from '../../middleware/fileupload_middleware.js'

// Initialize Express router and on matching the path pass the control to the associated controller
const ProductRouter = express.Router()

// Intantiate ProducctController Class
const productController = new ProductController()

// All the paths to controller methods
ProductRouter.get("/", (req, res) => {
    productController.getAllProducts(req, res)
})

// Rate a product
ProductRouter.post("/rate", (req, res)=>{
    productController.rateProduct(req, res)
})

// Add a new product
ProductRouter.post(
    "/",
    upload.single('imageUrl'), (req, res) => {
        productController.addProduct(req, res)
    })

// To get the filtered data using query params
ProductRouter.get('/filter', (req, res) => {
    productController.filterProducts(req, res)
})

// To get the category wise average
ProductRouter.get("/averageprice", (req, res)=>{
    productController.averagePrice(req, res)
})

// // To get the product against specified id using root parameters
ProductRouter.get("/:id", (req, res) => {
    productController.getProduct(req, res)
})

export default ProductRouter
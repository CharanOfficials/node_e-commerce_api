//  Manage routes/ paths to Product Controllers
// import router from express
import express from 'express'
import ProductController from './product_controller.js'
import { upload } from '../../../middleware/fileupload_middleware.js'

// Initialize Express router and on matching the path pass the control to the associated controller
const ProductRouter = express.Router()

// Intantiate ProducctController Class
const productController = new ProductController()

// All the paths to controller methods
ProductRouter.get("/", productController.getAllProducts)
// router.get("/", productController.getProduct)
// router.post("/", productController.rateProduct)
ProductRouter.post(
    "/",
    upload.single('imageUrl'),
    productController.addProduct)

// To get the product against specified id using root parameters
ProductRouter.get("/:id", productController.getProduct)

// To get the filtered data
ProductRouter.get('/filter', productController.filterProducts)

export default ProductRouter

import ProductRepository from './product.repository.js'
// import productSchema from './product_models.js'
import mongoose from 'mongoose'
import { ApplicaationError } from '../../../error-handler/applicationError.js'
import { productSchema } from "./product.schema.js"
const ProductModel = mongoose.model("Product", productSchema)
class ProductController {
    constructor() {
        this.productRepository = new ProductRepository()
    }
    // to get all the products
    async getAllProducts(req, res) {
        try {
            const products = await this.productRepository.getAll()
            res.status(200).send(products)
        }catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong", 500)
        }
    }
    // to add a product
    
    async addProduct(req, res) {
        try {
            const { name, desc, category, sizes, price } = req.body
            // console.log(req.file)
            if (req.type === "seller") {
                // const createdRecord = await this.productRepository.add(newProduct)
                const prod = await ProductModel.create({
                name:name,
                desc:desc,
                imageUrl:req.file.filename,
                price:parseFloat(price),
                category: category,
                sizes:sizes.split(','),
                inStock:sizes.split(',')
                })
                res.status(201).send(prod) // resource created
            } else {
                res.status(400).send("Invalid User")
            }
        }catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong", 500)
        }
    }
    //  to rate a product
    async rateProduct(req, res) {
        try {
            const userID = req.userID
            const productID = req.body.productID
            const rating = req.body.rating
            await this.productRepository.rateProduct(userID, productID, rating)
            res.status(200).send("Rating has been added.")
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong", 500)
        }
    }
    //  to get a single product using form data
    async getProduct(req, res) {
        try {
            const id = req.params.id
            const product = await this.productRepository.getOne(id)
        
            if (!product) {
                return res.status(404).send("Product not found")
            } else {
                return res.status(200).send(product)
            }
        }catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong", 500)
        }
    }
    async filterProducts(req, res) {
        try {
            const minPrice = req.query.minPrice;
            // const maxPrice = req.query.maxPrice;
            // const category = req.query.category;
            const categories = req.query.categories;
            const result = await this.productRepository.filterProducts(
                minPrice,
                categories
            );
            res.status(200).send(result)
        }catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong", 500)
        }
    }
    async averagePrice(req, res) {
        try {
            const result = await this.productRepository.averageProductPricePerCategory()
            res.status(200).send(result)
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong", 500)
        }
    }
}
export default ProductController
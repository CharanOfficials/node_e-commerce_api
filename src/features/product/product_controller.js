
import ProductModel from './product_models.js'
class ProductController {
    // to get all the products
    getAllProducts(req, res) {
        const products = ProductModel.getAll()
        res.status(200).send(products)
    }
    // to add a product
    
    addProduct(req, res) {
        const { name, price, sizes } = req.body
        // console.log(req.file)
        const newPrduct = {
            name, 
            price: parseFloat(price),
            sizes: sizes.split(','),
            imageUrl: req.file.filename
        }
        // console.log(req.file)
        const createdRecord = ProductModel.add(newPrduct)
        res.status(201).send(createdRecord) // resource created
    }
    //  to rate a product
    rateProduct(req, res) {
        const userID = req.query.userID
        const productID = req.query.productID
        const rating = req.query.rating
        const error = ProductModel.rateProduct(userID, productID, rating)
        if (error) {
            res.status(400).send(error)
        } else {
            res.status(200).send("Rating has been added.")
        }
    }
    //  to get a single product using form data
    getProduct(req, res) {
        const id = req.params.id
        const product = ProductModel.get(id)
        
        if (!product) {
            return res.status(404).send("Product not found")
        } else {
            return res.status(200).send(product)
        }
    }
    filterProducts(req, res) {
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const result = ProductModel.filter(
            minPrice,
            maxPrice,
            category
        );
        res.status(200).send(result);
    }
}
export default ProductController
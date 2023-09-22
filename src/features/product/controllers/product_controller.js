
import ProductModel from './product_models.js'
class ProductController {
    // to get all the products
    getAllProducts(req, res) {
        const products = ProductModel.GetAll()
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
        
    }
    //  to get a single product using form data
    getProduct(req, res) {
        console.log("getProduct")
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
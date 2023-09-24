import { ApplicaationError } from '../../../error-handler/applicationError.js';
import UserModel from '../user/user.model.js'
class ProductModel{
  // Mapping of the class object
    constructor(id, name, desc, imageUrl, category, price, sizes) {
        this.id = id,
        this.name = name,
        this.desc = desc,
        this.imageUrl = imageUrl,
        this.category = category,
        this.price = price,
        this.sizes = sizes
  }
  // Add a new received product after adding the id
  static add(product) {
    product.id = products.length + 1; // having the issue on deletion
    products.push(product)
    return product
  }
  // get one product
  static get(id) {
    const product = products.find((i) => i.id == id)
    return product;
  }
  // Get all products
  static getAll() {
      return products
  }
  static filter(minPrice, maxPrice, category) {
    minPrice = Number(minPrice)
    maxPrice = Number(maxPrice)
    // Filter product
    const result = products.filter((product) => {
      return (!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice) && (!category || product.category === category)
    })
    return result
  }
  static rateProduct(userID, productID, rating) {
    userID = Number(userID)
    productID = Number(productID)
    // Validate  User
    const user = UserModel.getAllUsers().find(u => u.id === userID)
    if (!user) {
      throw new ApplicaationError("User not found", 404)
    }
    const product = products.find((p) => p.id === productID)
    if (!product) {
      throw new ApplicaationError("Product not found", 404)
    }
    // Check if there are any rating and if not then add ratings array which means no user rating is available
    if (!product.ratings) {
      product.ratings = []
      product.ratings.push({ userID: userID, rating: rating })
      // console.log("New rating", product)
    } else {
      // check if user rating is already available
      const existingRatingIndex = product.ratings.findIndex((r) => r.userID === userID)
      if (existingRatingIndex >= 0) {
        product.ratings[existingRatingIndex] = { userID: userID, rating: rating }
        // console.log("Updated rating", product)
      } else {
        // If no existing rating, then add new rating 
        product.ratings.push({ userID: userID, rating: rating })
        // console.log("Add fresh in existing rating pool", product)
      }
    }
  }
  }

// Data to be send back and this act as a DB
var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
        'Category1',
        19.99,
        ['M', 'XL']
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
        'Category2',
      29.99,
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
        'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
        'Category3',
      39.99,
      ['M', 'XL','S']
    )];

export default ProductModel
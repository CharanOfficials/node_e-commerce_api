import UserModel from '../user/user.model.js'
import ProductModel from '../product/product_models.js'
export default class CartItemModel{
    constructor(userID, productID, quantity) {
        this.productID = productID,
        this.userID = userID,
        this.quantity = quantity
    }
    static add(userID, productID, quantity) {
        // Conversions
        userID = Number(userID)
        quantity = Number(quantity)
        productID = Number(productID)
        // Avoid negative entries
        if (quantity <= 0) {
            return "Invalid quantity"
        }
        // Check user
        const user = UserModel.getAllUsers().find(u => u.id === userID)
        if (!user) {
            return "Invalid User"
        }
        // Check product
        const product = ProductModel.getAll().find(p => p.id === productID)
        if (!product) {
            return "Incorrect product"
        }
        // Check that whether item exist
        const itemExist = cartItems.findIndex(c => c.userID === userID && c.productID === productID)
        // If item in cart then update the existing product
        if (itemExist >= 0) {
            let quant = cartItems[itemExist].quantity
            quant += quantity
            cartItems[itemExist].quantity = quant
            return cartItems[itemExist]
        } else {
            // If item not in caart then create
            const cartItem = new CartItemModel(userID, productID, quantity)
            cartItem.id = cartItems.length+1
            cartItems.push(cartItem)
            return cartItem
        }
    }
    static getCartItems(userID) {
        // Check user
        const user = UserModel.getAllUsers().find(u => u.id === userID)
        if (!user) {
            return "Invalid User"
        }
        // if user then return
        return cartItems.filter(u => u.userID === userID)
    }
    static update(userID, productID, quantity) {
        // Conversionss
        userID = Number(userID)
        quantity = Number(quantity)
        productID = Number(productID)
        // check quantity received
        if (quantity <= 0) {
            return "Invalid quantity"
        }
        // Check user
        const user = UserModel.getAllUsers().find(u => u.id === userID)
        if (!user) {
            return "Invalid User"
        }
        // Check product
        const product = ProductModel.getAll().find(p => p.id === productID)
        if (!product) {
            return "Incorrect product"
        }
        // Check if sitem already in cart
        const itemExist = cartItems.findIndex(c => c.userID === userID && c.productID === productID) 
        // If iten then update
        if (itemExist >=0 ) {
            cartItems[itemExist].quantity = quantity
            return "Product updated"
        } else {
            // Else nothing to update
            return "No product found in cart"
        }
    }
    static delete(cartItemID, userID) {
        // Conversions
        cartItemID = Number(cartItemID)
        userID = Number(userID)
        // console.log(cartItems)
        const cartIdx = cartItems.findIndex(c => c.id === cartItemID && c.userID === userID)
        // If no cart
        if (cartIdx == -1) {
            return "Item not found"
        } else {
            // If cart
            cartItems.splice(cartIdx, 1)
        }
    }
}

let cartItems = []
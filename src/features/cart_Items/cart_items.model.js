import UserModel from '../user/user.model.js'
import ProductModel from '../product/product_models.js'
export default class CartItemModel{
    constructor(userID, productID, quantity) {
        this.productID = productID,
        this.userID = userID,
        this.quantity = quantity
    }
    static add(userID, productID, quantity) {
        userID = Number(userID)
        quantity = Number(quantity)
        productID = Number(productID)
        if (quantity <= 0) {
            return "Invalid quantity"
        }
        const user = UserModel.getAllUsers().find(u => u.id === userID)
        if (!user) {
            return "Invalid User"
        }
        const product = ProductModel.getAll().find(p => p.id === productID)
        if (!product) {
            return "Incorrect product"
        }
        const itemExist = cartItems.findIndex(c => c.userID === userID && c.productID === productID)
        if (itemExist >= 0) {
            let quant = cartItems[itemExist].quantity
            quant += quantity
            cartItems[itemExist].quantity = quant
            return cartItems[itemExist]
        } else {
            const cartItem = new CartItemModel(userID, productID, quantity)
            cartItem.id = cartItems.length+1
            cartItems.push(cartItem)
            return cartItem
        }
    }
    static getCartItems(userID) {
        const user = UserModel.getAllUsers().find(u => u.id === userID)
        if (!user) {
            return "Invalid User"
        }
        return cartItems.filter(u => u.userID === userID)
    }
    static update(userID, productID, quantity) {
        userID = Number(userID)
        quantity = Number(quantity)
        productID = Number(productID)
        if (quantity <= 0) {
            return "Invalid quantity"
        }
        const user = UserModel.getAllUsers().find(u => u.id === userID)
        if (!user) {
            return "Invalid User"
        }
        const product = ProductModel.getAll().find(p => p.id === productID)
        if (!product) {
            return "Incorrect product"
        }
        const itemExist = cartItems.findIndex(c => c.userID === userID && c.productID === productID) 
        if (itemExist >=0 ) {
            cartItems[itemExist].quantity = quantity
            return "Product updated"
        } else {
            return "No product found in cart"
        }
    }
    static delete(cartItemID, userID) {
        cartItemID = Number(cartItemID)
        userID = Number(userID)
        // console.log(cartItems)
        const cartIdx = cartItems.findIndex(c => c.id === cartItemID && c.userID === userID)
        if (cartIdx == -1) {
            return "Item not found"
        } else {
            cartItems.splice(cartIdx, 1)
        }
    }
}

let cartItems = []
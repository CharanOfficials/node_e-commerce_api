import CartItemModel from "./cart_items.model.js";
export class CartItemsController{
    add(req, res) {
        const { productID, quantity } = req.query
        const userID = req.userID
        const item = CartItemModel.add(userID, productID, quantity)
        if (typeof (item) == "string") {
            res.status(401).send(item)
        } else {
            res.status(201).send("Cart is updated")
        }
    }
    get(req, res) {
        const userID = req.userID
        const cart = CartItemModel.getCartItems(userID)
        res.status(200).send(cart)
    }
    update(req, res) {
        const userID = req.userID
        const { productID, quantity } = req.query
        const status = CartItemModel.update(userID, productID, quantity)
        return res.status(200).send(status)
    }
    delete(req, res) {
        const userID = req.userID
        const cartItemID = req.params.id
        const error = CartItemModel.delete(cartItemID, userID)
        if (error) {
            return res.status(404).send(error)
        } else {
            return res.status(200).send("Cart item is removed")
        }
        return res.status(200).send(result)
    }
}
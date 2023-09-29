import CartItemModel from "./cart_items.model.js";
import CartRepository from "./cart_items.repository.js";
import { ApplicaationError } from "../../../error-handler/applicationError.js";
export class CartItemsController{
    constructor() {
        this.cartRepository = new CartRepository() 
    }
    async add(req, res) {
        try {
            const { productID, quantity } = req.body
            const userID = req.userID
            const item = await this.cartRepository.add(userID, productID, quantity)
            res.status(201).send("Cart is updated")
        } catch (err){
            console.log(err)
            throw new ApplicaationError("Something went wrong", 500)
        }
    }
    async get(req, res) {
        try {
            const userID = req.userID
            const cart = await this.cartRepository.getCartItems(userID)
            res.status(200).send(cart)
        }catch (err){
            console.log(err)
            throw new ApplicaationError("Something went wrong", 500)
        }
    }
    update(req, res) {
        const userID = req.userID
        const { productID, quantity } = req.query // Getting query param using destructuring
        const status = CartItemModel.update(userID, productID, quantity)
        return res.status(200).send(status)
    }
    async delete(req, res) {
        try {
            const userID = req.userID
            const cartItemID = req.params.id
            const isDeleted = await this.cartRepository.delete(cartItemID, userID)
            if (!isDeleted) {
                return res.status(404).send("Item not found")
            } else {
                return res.status(200).send("Cart item is deleted")
            }
        } catch (err) {
            console.log(err)
            throw new ApplicaationError("Something went wrong", 500)
        }
    }
}
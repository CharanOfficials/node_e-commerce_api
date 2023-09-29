import express from 'express'
import { CartItemsController } from './cart_items.controller.js'

const CartRouter = express.Router()
const cartItemController = new CartItemsController()

// Be careful while using below types of routes
CartRouter.post('/', (req, res) => {
    cartItemController.add(req, res)
})
CartRouter.get('/', (req, res) => {
    cartItemController.get(req, res)
})
// CartRouter.put('/', (req, res) => {
//     cartItemController.update(req, res)
// })
CartRouter.delete('/:id', (req, res) => {
    cartItemController.delete(req, res)
})
export default CartRouter
import express from 'express'
import { CartItemsController } from './cart_items.controller.js'

const CartRouter = express.Router()
const cartItemController = new CartItemsController()

// Be careful while using below types of routes
CartRouter.post('/', cartItemController.add)
CartRouter.get('/', cartItemController.get)
CartRouter.put('/', cartItemController.update)
CartRouter.delete('/:id', cartItemController.delete)
export default CartRouter
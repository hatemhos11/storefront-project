import userRoutes from './api/users.route'
import productRoutes from './api/products.route'
import orderRoutes from './api/orders.route'
import productsOrder from './api/productsOrder.route'
import express, { Router } from 'express'
import CheckToken from '../middlewares/Authentication.middleware'

const MainRouter: Router = express.Router()

MainRouter.use('/users', userRoutes)
MainRouter.use('/products', productRoutes)
MainRouter.use('/orders', CheckToken, orderRoutes)
MainRouter.use('/products-order', CheckToken, productsOrder)

export default MainRouter

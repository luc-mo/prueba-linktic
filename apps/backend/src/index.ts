import express from 'express'
import cors from 'cors'

import { config } from './infrastructure/config'
import { authController } from './infrastructure/http/auth-controller'
import { productsController } from './infrastructure/http/products-controller'
import { ordersController } from './infrastructure/http/orders-controller'

const { port } = config.server
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', authController)
app.use('/api/v1/products', productsController)
app.use('/api/v1/orders', ordersController)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})

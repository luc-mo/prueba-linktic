import { Router } from 'express'

import { container } from '@/container'
import { SaveProductCommand } from '@/application/save-product'

const productsController = Router()

productsController.get('/', async (req, res) => {
	try {
		const findAllProducts = container.resolve('findAllProducts')
		const response = await findAllProducts.execute()
		res.status(200).send(response)
	} catch (error) {
		console.error(error)
		res.status(500).send({ message: 'Internal server error' })
	}
})

productsController.put('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const { name, description, price, stock, enabled } = req.body
		const command = new SaveProductCommand({ id, name, description, price, stock, enabled })
		const saveProduct = container.resolve('saveProduct')
		await saveProduct.execute(command)
		res.status(200).send({ message: 'Product saved' })
	} catch (error) {
		console.error(error)
		res.status(500).send({ message: 'Internal server error' })
	}
})

export { productsController }

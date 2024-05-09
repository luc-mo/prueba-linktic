import { Router } from 'express'

import { container } from '@/container'
import { SaveOrderCommand } from '@/application/save-order'

const ordersController = Router()

ordersController.put('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const { userId, products, shipped } = req.body
		const command = new SaveOrderCommand({ id, userId, products, shipped })
		const saveOrder = container.resolve('saveOrder')
		await saveOrder.execute(command)
		res.status(200).send({ message: 'Order saved' })
	} catch (error) {
		console.error(error)
		res.status(500).send({ message: 'Internal server error' })
	}
})

export { ordersController }

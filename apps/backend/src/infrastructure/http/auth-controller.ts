import { Router } from 'express'

import { container } from '@/container'
import { RegisterUserCommand } from '@/application/register-user'
import { LoginUserCommand } from '@/application/login-user'

const authController = Router()

authController.post('/register', async (req, res) => {
	try {
		const { username, password, role } = req.body
		const command = new RegisterUserCommand({ username, password, role })
		const registerUser = container.resolve('registerUser')
		await registerUser.execute(command)
		res.status(201).send({ message: 'User created' })
	} catch (error) {
		// TODO - implement error handling
		console.error(error)
		res.status(500).send({ message: 'Internal server error' })
	}
})

authController.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body
		const command = new LoginUserCommand({ username, password })
		const loginUser = container.resolve('loginUser')
		const response = await loginUser.execute(command)
		res.send(response)
	} catch (error) {
		// TODO - implement error handling
		console.error(error)
		res.status(500).send({ message: 'Internal server error' })
	}
})

export { authController }

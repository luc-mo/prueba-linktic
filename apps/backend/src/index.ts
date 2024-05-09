import express from 'express'
import cors from 'cors'

import { config } from './infrastructure/config'
import { authController } from './infrastructure/http/auth-controller'

const { port } = config.server
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', authController)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})

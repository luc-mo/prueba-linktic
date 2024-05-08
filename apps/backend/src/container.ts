import { createContainer, InjectionMode, asValue } from 'awilix'

import crypto from 'node:crypto'
import pg from 'pg'
import jwt from 'jsonwebtoken'

const container = createContainer<Container>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// Libraries
	crypto: asValue(crypto),
	pg: asValue(pg),
	jwt: asValue(jwt),
})

export { container }

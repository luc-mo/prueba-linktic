import { createContainer, InjectionMode, asValue, asClass } from 'awilix'

import crypto from 'node:crypto'
import pg from 'pg'
import jwt from 'jsonwebtoken'

import { IdGenerator } from './domain/services/id-generator'

const container = createContainer<Container>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// Libraries
	crypto: asValue(crypto),
	pg: asValue(pg),
	jwt: asValue(jwt),

	// Domain services
	idGenerator: asClass(IdGenerator),
})

export { container }

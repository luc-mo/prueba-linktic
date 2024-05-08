import { createContainer, InjectionMode, asValue, asClass } from 'awilix'

import crypto from 'node:crypto'
import pg from 'pg'
import jwt from 'jsonwebtoken'

import { config } from './infrastructure/config'
import { IdGenerator } from './domain/services/id-generator'

import { PostgresHandler } from './infrastructure/persistence/postgres/db-handler'

const container = createContainer<Container>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// Libraries
	crypto: asValue(crypto),
	pg: asValue(pg),
	jwt: asValue(jwt),

	// Config
	config: asValue(config),

	// Domain services
	idGenerator: asClass(IdGenerator),

	// Persistence
	dbHandler: asClass(PostgresHandler).singleton(),
})

export { container }

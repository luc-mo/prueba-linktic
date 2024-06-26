import { createContainer, InjectionMode, asValue, asClass, asFunction } from 'awilix'

import crypto from 'node:crypto'
import pg from 'pg'
import jwt from 'jsonwebtoken'

import { config } from './infrastructure/config'
import { IdGenerator } from './domain/services/id-generator'
import { Cipher } from './domain/services/cipher'

import { PostgresHandler } from './infrastructure/persistence/postgres/db-handler'
import { UserRepository } from './infrastructure/persistence/postgres/user/repository'
import { AuthRepository } from './infrastructure/persistence/postgres/auth/repository'
import { ProductRepository } from './infrastructure/persistence/postgres/product/repository'
import { OrderRepository } from './infrastructure/persistence/postgres/order/repository'

import { userDocumentParser } from './infrastructure/persistence/postgres/user/document-parser'
import { authDocumentParser } from './infrastructure/persistence/postgres/auth/document-parser'
import { productDocumentParser } from './infrastructure/persistence/postgres/product/document-parser'
import { orderDocumentParser } from './infrastructure/persistence/postgres/order/document-parser'

import { RegisterUser } from './application/register-user'
import { LoginUser } from './application/login-user'
import { FindAllProducts } from './application/find-all-products'
import { SaveProduct } from './application/save-product'
import { SaveOrder } from './application/save-order'

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
	cipher: asClass(Cipher),

	// Persistence
	dbHandler: asClass(PostgresHandler).singleton(),

	// Repositories
	userRepository: asClass(UserRepository),
	authRepository: asClass(AuthRepository),
	productRepository: asClass(ProductRepository),
	orderRepository: asClass(OrderRepository),

	// Document parsers
	userDocumentParser: asFunction(userDocumentParser),
	authDocumentParser: asFunction(authDocumentParser),
	productDocumentParser: asFunction(productDocumentParser),
	orderDocumentParser: asFunction(orderDocumentParser),

	// Use cases
	registerUser: asClass(RegisterUser),
	loginUser: asClass(LoginUser),
	findAllProducts: asClass(FindAllProducts),
	saveProduct: asClass(SaveProduct),
	saveOrder: asClass(SaveOrder),
})

export { container }

interface Container {
	// Libraries
	crypto: typeof import('crypto')
	pg: typeof import('pg')
	jwt: typeof import('jsonwebtoken')

	// Config
	config: typeof import('@/infrastructure/config').config

	// Domain services
	idGenerator: import('@/domain/services/id-generator').IdGenerator
	cipher: import('@/domain/services/cipher').Cipher

	// Persistence
	dbHandler: import('@/infrastructure/persistence/postgres/db-handler').PostgresHandler

	// Repositories
	authRepository: import('@/infrastructure/persistence/postgres/auth/repository').AuthRepository
	userRepository: import('@/infrastructure/persistence/postgres/user/repository').UserRepository
	productRepository: import('@/infrastructure/persistence/postgres/product/repository').ProductRepository
	orderRepository: import('@/infrastructure/persistence/postgres/order/repository').OrderRepository

	// Document parsers
	authDocumentParser: ReturnType<
		typeof import('@/infrastructure/persistence/postgres/auth/document-parser').authDocumentParser
	>
	userDocumentParser: ReturnType<
		typeof import('@/infrastructure/persistence/postgres/user/document-parser').userDocumentParser
	>
	productDocumentParser: ReturnType<
		typeof import('@/infrastructure/persistence/postgres/product/document-parser').productDocumentParser
	>
	orderDocumentParser: ReturnType<
		typeof import('@/infrastructure/persistence/postgres/order/document-parser').orderDocumentParser
	>

	// Use cases
	registerUser: import('@/application/register-user').RegisterUser
	loginUser: import('@/application/login-user').LoginUser
	findAllProducts: import('@/application/find-all-products').FindAllProducts
	saveProduct: import('@/application/save-product').SaveProduct
	saveOrder: import('@/application/save-order').SaveOrder
}

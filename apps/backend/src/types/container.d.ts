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
}

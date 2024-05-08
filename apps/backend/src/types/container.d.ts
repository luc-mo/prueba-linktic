interface Container {
	// Libraries
	crypto: typeof import('crypto')
	pg: typeof import('pg')
	jwt: typeof import('jsonwebtoken')

	// Config
	config: typeof import('@/infrastructure/config').config

	// Domain services
	idGenerator: import('@/domain/services/id-generator').IdGenerator

	// Persistence
	dbHandler: import('@/infrastructure/persistence/postgres/db-handler').PostgresHandler

	// Repositories
	userRepository: import('@/infrastructure/persistence/postgres/user/repository').UserRepository

	// Document parsers
	userDocumentParser: ReturnType<
		typeof import('@/infrastructure/persistence/postgres/user/document-parser').userDocumentParser
	>
}

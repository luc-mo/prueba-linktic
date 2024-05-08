interface Container {
	// Libraries
	crypto: typeof import('crypto')
	pg: typeof import('pg')
	jwt: typeof import('jsonwebtoken')

	// Config
	config: typeof import('@/infrastructure/config').config

	// Domain services
	idGenerator: import('@/domain/services/id-generator').IdGenerator
}

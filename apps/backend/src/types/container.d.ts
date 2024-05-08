interface Container {
	// Libraries
	crypto: typeof import('crypto')
	pg: typeof import('pg')
	jwt: typeof import('jsonwebtoken')

	// Domain services
	idGenerator: import('@/domain/services/id-generator').IdGenerator
}

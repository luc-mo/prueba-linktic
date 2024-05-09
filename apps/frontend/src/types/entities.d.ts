interface UserEntity {
	username: string
	role: UserRole
}

type UserRole = 'admin' | 'user'

interface ProductEntity {
	id: string
	name: string
	description: string
	price: number
	stock: number
	enabled: boolean
}

import { User } from '@/domain/user'

export const userDocumentParser = () => {
	return {
		toDomain: (document: any) => {
			return new User({
				id: document.id,
				username: document.username,
				role: document.role,
			})
		},
		toDocument: (user: User) => {
			return {
				id: user.id,
				username: user.username,
				role: user.role,
			}
		},
	}
}

import { Auth } from '@/domain/auth'

export const authDocumentParser = () => {
	return {
		toDomain: (document: any) => {
			return new Auth({
				id: document.id,
				userId: document.user_id,
				password: document.password,
				salt: document.salt,
			})
		},
		toDocument: (auth: Auth) => {
			return {
				id: auth.id,
				user_id: auth.userId,
				salt: auth.salt,
				password: auth.password,
			}
		},
	}
}

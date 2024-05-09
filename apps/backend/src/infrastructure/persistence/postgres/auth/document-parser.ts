import { Auth } from '@/domain/auth'

export const authDocumentParser = ({ cipher }: Pick<Container, 'cipher'>) => {
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
				password: cipher.encrypt({
					data: auth.password,
					salt: auth.salt,
				}),
			}
		},
	}
}

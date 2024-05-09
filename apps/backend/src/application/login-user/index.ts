import type { Auth } from '@/domain/auth'
import type { User } from '@/domain/user'
import { LoginUserCommand } from './login-user-command'
import { LoginUserResponse } from './login-user-response'

export class LoginUser {
	private readonly _cipher: Container['cipher']
	private readonly _authRepository: Container['authRepository']
	private readonly _userRepository: Container['userRepository']

	constructor({
		cipher,
		authRepository,
		userRepository,
	}: Pick<Container, 'cipher' | 'authRepository' | 'userRepository'>) {
		this._cipher = cipher
		this._authRepository = authRepository
		this._userRepository = userRepository
	}

	public async execute({ username, password }: LoginUserCommand) {
		const auth = await this._authRepository.findByUsername(username)
		this._assertAuthExists(auth)

		const encryptedPassword = this._cipher.encrypt({ data: password, salt: auth.salt })
		this._assertUserPassword(encryptedPassword, auth.password)

		const user = await this._userRepository.findById(auth.userId)
		this._assertUserExists(user)

		const token = this._cipher.signJwt({ id: user.id, role: user.role })
		return new LoginUserResponse({
			username: user.username,
			role: user.role,
			token,
		})
	}

	private _assertAuthExists(auth: Auth | null): asserts auth is Auth {
		if (!auth) {
			throw new Error('Invalid credentials')
		}
	}

	private _assertUserPassword(password: string, userPassword: string) {
		if (password !== userPassword) {
			throw new Error('Invalid credentials')
		}
	}

	private _assertUserExists(user: User | null): asserts user is User {
		if (!user) {
			throw new Error('User not found')
		}
	}
}

export { LoginUserCommand, LoginUserResponse }

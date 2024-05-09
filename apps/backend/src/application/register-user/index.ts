import { User } from '@/domain/user'
import { RegisterUserCommand } from './register-user-command'
import { Auth } from '@/domain/auth'

export class RegisterUser {
	private readonly _idGenerator: Container['idGenerator']
	private readonly _cipher: Container['cipher']
	private readonly _authRepository: Container['authRepository']
	private readonly _userRepository: Container['userRepository']

	constructor({
		idGenerator,
		cipher,
		authRepository,
		userRepository,
	}: Pick<Container, 'idGenerator' | 'cipher' | 'authRepository' | 'userRepository'>) {
		this._idGenerator = idGenerator
		this._cipher = cipher
		this._authRepository = authRepository
		this._userRepository = userRepository
	}

	public async execute({ username, password, role }: RegisterUserCommand): Promise<void> {
		const userId = this._idGenerator.generateId()
		const authId = this._idGenerator.generateId()
		const salt = this._idGenerator.generateSalt()
		const encryptedPassword = this._cipher.encrypt({ data: password, salt })

		const exists = await this._userRepository.findById(userId)
		this._assertUserExists(exists)

		const auth = new Auth({ id: authId, userId, password: encryptedPassword, salt })
		const user = new User({ id: userId, username, role })

		await this._userRepository.create(user)
		await this._authRepository.create(auth)
	}

	private _assertUserExists(user: User | null): void {
		if (user) {
			throw new Error('User already exists')
		}
	}
}

export { RegisterUserCommand }

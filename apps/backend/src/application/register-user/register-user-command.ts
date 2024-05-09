export class RegisterUserCommand {
	public readonly username: string
	public readonly password: string
	public readonly role: Role

	constructor({ username, password, role }: Constructor) {
		this.username = username
		this.password = password
		this.role = role
	}
}

type Role = 'admin' | 'user'

interface Constructor {
	username: string
	password: string
	role: Role
}

export class LoginUserCommand {
	public readonly username: string
	public readonly password: string

	constructor({ username, password }: Constructor) {
		this.username = username
		this.password = password
	}
}

interface Constructor {
	username: string
	password: string
}

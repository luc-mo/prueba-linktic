export class LoginUserResponse {
	public readonly token: string
	public readonly username: string
	public readonly role: string

	constructor({ username, role, token }: Constructor) {
		this.username = username
		this.role = role
		this.token = token
	}
}

interface Constructor {
	username: string
	role: string
	token: string
}

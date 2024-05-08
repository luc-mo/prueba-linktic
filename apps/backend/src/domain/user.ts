export class User {
	private readonly _id: string
	private readonly _username: string
	private readonly _role: Role

	constructor({ id, username, role }: Constructor) {
		this._id = id
		this._username = username
		this._role = role
	}

	public get id(): string {
		return this._id
	}

	public get username(): string {
		return this._username
	}

	public get role(): Role {
		return this._role
	}
}

interface Constructor {
	id: string
	username: string
	role: Role
}

type Role = 'admin' | 'user'

export class Auth {
	private readonly _id: string
	private readonly _userId: string
	private readonly _password: string
	private readonly _salt: string

	constructor({ id, userId, password, salt }: Constructor) {
		this._id = id
		this._userId = userId
		this._password = password
		this._salt = salt
	}

	public get id(): string {
		return this._id
	}

	public get userId(): string {
		return this._userId
	}

	public get password(): string {
		return this._password
	}

	public get salt(): string {
		return this._salt
	}
}

interface Constructor {
	id: string
	userId: string
	password: string
	salt: string
}

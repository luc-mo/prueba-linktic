export class IdGenerator {
	private readonly _crypto: Container['crypto']

	constructor({ crypto }: Pick<Container, 'crypto'>) {
		this._crypto = crypto
	}

	public generateId(): string {
		return this._crypto.webcrypto.randomUUID()
	}

	public generateSalt(): string {
		return this._crypto.randomBytes(16).toString('hex')
	}
}

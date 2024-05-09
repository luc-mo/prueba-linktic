import type { JwtPayload } from 'jsonwebtoken'

export class Cipher {
	private readonly _JWT_EXPIRATION = 60 * 60 * 24 * 30
	private readonly _ENCRYPT_ITERATIONS = 10000
	private readonly _ENCRYPT_KEYLEN = 64
	private readonly _ENCRYPT_DIGEST = 'sha512'

	private readonly _crypto: Container['crypto']
	private readonly _jwt: Container['jwt']
	private readonly _config: Container['config']

	constructor({ crypto, jwt, config }: Pick<Container, 'crypto' | 'jwt' | 'config'>) {
		this._crypto = crypto
		this._jwt = jwt
		this._config = config
	}

	public signJwt<T extends object>(payload: T) {
		return this._jwt.sign(payload, this._config.server.jwtSecret, {
			expiresIn: this._JWT_EXPIRATION,
		})
	}

	public verifyJwt<T extends object>(token: string) {
		return this._jwt.verify(token, this._config.server.jwtSecret) as T & JwtPayload
	}

	public encrypt({ data, salt }: Encrypt) {
		const buffer = this._crypto.pbkdf2Sync(
			data,
			salt,
			this._ENCRYPT_ITERATIONS,
			this._ENCRYPT_KEYLEN,
			this._ENCRYPT_DIGEST
		)
		return buffer.toString('base64')
	}
}

interface Encrypt {
	data: string
	salt: string
}

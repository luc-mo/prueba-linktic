import type { Auth } from '@/domain/auth'

export class AuthRepository {
	private readonly _dbHandler: Container['dbHandler']
	private readonly _authDocumentParser: Container['authDocumentParser']

	constructor({
		dbHandler,
		authDocumentParser,
	}: Pick<Container, 'dbHandler' | 'authDocumentParser'>) {
		this._dbHandler = dbHandler
		this._authDocumentParser = authDocumentParser
	}

	public async findByUsernameAndPassword(username: string, password: string): Promise<Auth | null> {
		const instance = await this._dbHandler.getInstance()
		const result = await instance.query(
			`
        SELECT
          auth.id,
          auth.user_id,
          auth.password,
          auth.salt
        FROM
          auth
        JOIN
          users
        ON
          auth.user_id = users.id
        WHERE
          users.username = $1
        AND
          auth.password = $2
      `,
			[username, password]
		)
		return result[0] ? this._authDocumentParser.toDomain(result[0]) : null
	}

	public async create(auth: Auth): Promise<void> {
		const instance = await this._dbHandler.getInstance()
		const document = this._authDocumentParser.toDocument(auth)
		await instance.query(
			`
				INSERT INTO
					auth (id, user_id, password, salt)
				VALUES
					($1, $2, $3, $4)
			`,
			[document.id, document.user_id, document.password, document.salt]
		)
	}
}

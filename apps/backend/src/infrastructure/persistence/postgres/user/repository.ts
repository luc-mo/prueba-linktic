import type { User } from '@/domain/user'

export class UserRepository {
	private readonly _dbHandler: Container['dbHandler']
	private readonly _userDocumentParser: Container['userDocumentParser']

	constructor({
		dbHandler,
		userDocumentParser,
	}: Pick<Container, 'dbHandler' | 'userDocumentParser'>) {
		this._dbHandler = dbHandler
		this._userDocumentParser = userDocumentParser
	}

	public async findById(id: string): Promise<User | null> {
		const instance = await this._dbHandler.getInstance()
		const result = await instance.query(
			`
        SELECT
          users.id,
          users.username,
          users.role
        FROM
          users
        WHERE
          id = $1
      `,
			[id]
		)
		return result[0] ? this._userDocumentParser.toDomain(result[0]) : null
	}

	public async create(user: User): Promise<void> {
		const instance = await this._dbHandler.getInstance()
		const document = this._userDocumentParser.toDocument(user)
		await instance.query(
			`
        INSERT INTO
          users (id, username, role)
        VALUES
          ($1, $2, $3)
      `,
			[document.id, document.username, document.role]
		)
	}
}

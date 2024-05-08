import type { Pool, PoolClient } from 'pg'

export class PostgresHandler {
	private readonly _pg: Container['pg']
	private readonly _config: Container['config']

	private _pool: Pool | null = null
	private _client: PoolClient | null = null
	private _instance: PoolClient | null = null

	constructor({ pg, config }: Pick<Container, 'pg' | 'config'>) {
		this._pg = pg
		this._config = config
	}

	private _initializePool() {
		return new this._pg.Pool({
			host: this._config.postgres.host,
			port: this._config.postgres.port,
			user: this._config.postgres.user,
			password: this._config.postgres.password,
			database: this._config.postgres.database,
			max: this._config.postgres.max,
		})
	}

	private _connect() {
		if (!this._pool) {
			this._pool = this._initializePool()
		}
		return this._pool
	}

	private async _createInstance() {
		try {
			const pool = this._connect()
			this._client = await pool.connect()
			return this._client
		} catch (error) {
			console.error('Error in database connection', error)
			throw new Error(`Error in database connection: ${error}`)
		}
	}

	private _query<T = any>(sql: string, values: any[] = []) {
		return this._client!.query(sql, values)
			.then((result) => result.rows as T[])
			.catch((error) => {
				this._client!.release()
				throw error
			})
	}

	public async getInstance() {
		if (!this._instance) {
			this._instance = await this._createInstance()
		}
		return {
			client: this._instance,
			query: this._query.bind(this),
		}
	}
}

import type { Product } from '@/domain/product'

export class ProductRepository {
	private readonly _dbHandler: Container['dbHandler']
	private readonly _productDocumentParser: Container['productDocumentParser']

	constructor({
		dbHandler,
		productDocumentParser,
	}: Pick<Container, 'dbHandler' | 'productDocumentParser'>) {
		this._dbHandler = dbHandler
		this._productDocumentParser = productDocumentParser
	}

	public async findAll(): Promise<Product[]> {
		const instance = await this._dbHandler.getInstance()
		const result = await instance.query(`
      SELECT
        products.id,
        products.name,
        products.description,
        products.price,
        products.stock,
        products.enabled
      FROM
        products
			WHERE
				products.enabled = true
    `)
		return result.map((document) => this._productDocumentParser.toDomain(document))
	}

	public async findById(id: string): Promise<Product | null> {
		const instance = await this._dbHandler.getInstance()
		const result = await instance.query(
			`
        SELECT
          products.id,
          products.name,
          products.description,
          products.price,
          products.stock,
          products.enabled
        FROM
          products
        WHERE
          id = $1
      `,
			[id]
		)
		return result[0] ? this._productDocumentParser.toDomain(result[0]) : null
	}

	public async save(product: Product): Promise<void> {
		const instance = await this._dbHandler.getInstance()
		const document = this._productDocumentParser.toDocument(product)
		await instance.query(
			`
        INSERT INTO
          products (id, name, description, price, stock, enabled)
        VALUES
          ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id)
        DO UPDATE SET
          name = $2,
          description = $3,
          price = $4,
          stock = $5,
          enabled = $6
      `,
			[
				document.id,
				document.name,
				document.description,
				document.price,
				document.stock,
				document.enabled,
			]
		)
	}

	public async delete(id: string): Promise<void> {
		const instance = await this._dbHandler.getInstance()
		await instance.query(
			`
        UPDATE
          products
        SET
          enabled = false
        WHERE
          id = $1
      `,
			[id]
		)
	}
}

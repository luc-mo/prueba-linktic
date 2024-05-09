import { StringBuilder } from '@/common/string-builder'
import type { Order } from '@/domain/order'

export class OrderRepository {
	private readonly _dbHandler: Container['dbHandler']
	private readonly _orderDocumentParser: Container['orderDocumentParser']

	constructor({
		dbHandler,
		orderDocumentParser,
	}: Pick<Container, 'dbHandler' | 'orderDocumentParser'>) {
		this._dbHandler = dbHandler
		this._orderDocumentParser = orderDocumentParser
	}

	public async save(order: Order): Promise<void> {
		const instance = await this._dbHandler.getInstance()
		const document = this._orderDocumentParser.toDocument(order)
		const products = document.products
			.map((product) => `('${document.id}', '${product.product_id}', ${product.quantity})`)
			.join(', ')

		const query = new StringBuilder('BEGIN;')
			.concat(
				`
				INSERT INTO
					orders (id, shipped)
				VALUES
					('${document.id}', ${document.shipped});
			`
			)
			.concat(
				`
				INSERT INTO
					order_product (order_id, product_id, quantity)
				VALUES
					${products};
			`
			)
			.concatIfExists(
				`
				INSERT INTO
					order_user (order_id, user_id)
				VALUES
					('${document.id}', '${document.user_id}');
			`,
				Boolean(document.user_id)
			)
			.concat('COMMIT;')
			.toString()

		await instance.query(query)
	}
}

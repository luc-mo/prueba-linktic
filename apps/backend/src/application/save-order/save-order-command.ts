export class SaveOrderCommand {
	public readonly id: string
	public readonly userId?: string
	public readonly products: OrderProduct[]
	public readonly shipped: boolean

	constructor({ id, userId, products, shipped }: Constructor) {
		this.id = id
		this.userId = userId
		this.products = products
		this.shipped = shipped
	}
}

interface Constructor {
	id: string
	userId?: string
	products: OrderProduct[]
	shipped: boolean
}

interface OrderProduct {
	id: string
	quantity: number
}

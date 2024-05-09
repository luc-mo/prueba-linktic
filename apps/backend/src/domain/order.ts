import { Product } from './product'

export class Order {
	private readonly _id: string
	private readonly _userId?: string
	private readonly _products: OrderProduct[]
	private readonly _shipped: boolean

	constructor({ id, userId, products, shipped }: Constructor) {
		this._id = id
		this._userId = userId
		this._products = products
		this._shipped = shipped
	}

	get id(): string {
		return this._id
	}

	get userId(): string | undefined {
		return this._userId
	}

	get products(): OrderProduct[] {
		return this._products
	}

	get shipped(): boolean {
		return this._shipped
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

export class SaveProductCommand {
	public readonly id: string
	public readonly name: string
	public readonly description: string
	public readonly price: number
	public readonly stock: number
	public readonly enabled: boolean

	constructor({ id, name, description, price, stock, enabled }: Constructor) {
		this.id = id
		this.name = name
		this.description = description
		this.price = price
		this.stock = stock
		this.enabled = enabled
	}
}

interface Constructor {
	id: string
	name: string
	description: string
	price: number
	stock: number
	enabled: boolean
}

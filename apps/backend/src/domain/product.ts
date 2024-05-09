export class Product {
	private readonly _id: string
	private _name: string
	private _description: string
	private _price: number
	private _stock: number
	private _enabled: boolean

	constructor({ id, name, description, price, stock, enabled }: Constructor) {
		this._id = id
		this._name = name
		this._description = description
		this._price = price
		this._stock = stock
		this._enabled = enabled
	}

	public get id(): string {
		return this._id
	}

	public get name(): string {
		return this._name
	}

	public set name(name: string) {
		this._name = name
	}

	public get description(): string {
		return this._description
	}

	public set description(description: string) {
		this._description = description
	}

	public get price(): number {
		return this._price
	}

	public set price(price: number) {
		this._price = price
	}

	public get stock(): number {
		return this._stock
	}

	public set stock(stock: number) {
		this._stock = stock
	}

	public get enabled(): boolean {
		return this._enabled
	}

	public set enabled(enabled: boolean) {
		this._enabled = enabled
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

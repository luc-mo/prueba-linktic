export class FindAllProductsResponse {
	public readonly products: ProductResponse[]

	constructor(products: ProductResponse[]) {
		this.products = products
	}
}

interface ProductResponse {
	id: string
	name: string
	description: string
	price: number
	stock: number
	enabled: boolean
}

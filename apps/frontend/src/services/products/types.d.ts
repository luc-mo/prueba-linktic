export interface GetAllProductsResponse {
	products: Product[]
}

export interface SaveProductRequest {
	id: string
	name: string
	description: string
	price: number
	stock: number
	enabled: boolean
}

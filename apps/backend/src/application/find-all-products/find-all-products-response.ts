import type { Product } from '@/domain/product'

export class FindAllProductsResponse {
	public readonly products: Product[]

	constructor(products: Product[]) {
		this.products = products
	}
}

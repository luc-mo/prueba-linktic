import { FindAllProductsResponse } from './find-all-products-response'

export class FindAllProducts {
	private readonly productRepository: Container['productRepository']

	constructor({ productRepository }: Pick<Container, 'productRepository'>) {
		this.productRepository = productRepository
	}

	async execute(): Promise<FindAllProductsResponse> {
		const products = await this.productRepository.findAll()
		return new FindAllProductsResponse(products)
	}
}

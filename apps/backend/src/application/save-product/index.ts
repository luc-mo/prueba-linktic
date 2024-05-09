import { Product } from '@/domain/product'
import { SaveProductCommand } from './save-product-command'

export class SaveProduct {
	private readonly _productRepository: Container['productRepository']

	constructor({ productRepository }: Pick<Container, 'productRepository'>) {
		this._productRepository = productRepository
	}

	public async execute({ id, name, description, price, stock, enabled }: SaveProductCommand) {
		const product = new Product({ id, name, description, price, stock, enabled })
		await this._productRepository.save(product)
	}
}

export { SaveProductCommand }

import { Product } from '@/domain/product'

export const productDocumentParser = () => {
	return {
		toDomain: (document: any) => {
			return new Product({
				id: document.id,
				name: document.name,
				description: document.description,
				price: document.price,
				stock: document.stock,
				enabled: document.enabled,
			})
		},
		toDocument: (product: Product) => {
			return {
				id: product.id,
				name: product.name,
				description: product.description,
				price: product.price,
				stock: product.stock,
				enabled: product.enabled,
			}
		},
	}
}

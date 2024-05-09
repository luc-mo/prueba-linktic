import type { Order } from '@/domain/order'

export const orderDocumentParser = () => {
	return {
		toDocument: (order: Order) => {
			return {
				id: order.id,
				user_id: order.userId,
				products: order.products.map((product) => ({
					product_id: product.id,
					quantity: product.quantity,
				})),
				shipped: order.shipped,
			}
		},
	}
}

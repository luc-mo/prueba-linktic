export interface SaveOrderRequest {
	id: string
	userId?: string
	products: OrderProduct[]
	shipped: boolean
}

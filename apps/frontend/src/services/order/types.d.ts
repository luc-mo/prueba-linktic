export interface SaveOrderRequest {
	id: string
	products: OrderProduct[]
	shipped: boolean
}

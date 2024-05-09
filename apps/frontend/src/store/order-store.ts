import { writable } from 'svelte/store'

export interface OrderStore {
	products: OrderProduct[]
}

export const orderStore = writable<OrderStore>({ products: [] })

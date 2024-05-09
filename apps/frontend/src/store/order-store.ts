import { writable } from 'svelte/store'

export interface OrderStore {
	products: Map<string, number>
}

export const orderStore = writable<OrderStore>({ products: new Map() })

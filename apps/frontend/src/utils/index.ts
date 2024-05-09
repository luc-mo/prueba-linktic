import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs))
}

export function parseProductFormData(form: FormData): StrictOmit<ProductEntity, 'id'> {
	const data = Object.fromEntries(form.entries())
	const name = data.name as string
	const description = data.description as string
	const price = data.price as string
	const stock = data.stock as string

	return {
		name,
		description,
		price: Number.parseInt(price),
		stock: Number.parseInt(stock),
		enabled: true,
	}
}

export function parseProductOrder(order: Map<string, number>, products: ProductEntity[]) {
	return products.map((product) => ({
		...product,
		quantity: order.get(product.id) ?? 0,
	}))
}

export function parseOrder(products: Map<string, number>) {
	return Array.from(products.entries()).map(([id, quantity]) => ({
		id,
		quantity,
	}))
}

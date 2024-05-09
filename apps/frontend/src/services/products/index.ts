import { HttpClient } from '@/services/http-client'
import type { GetAllProductsResponse, SaveProductRequest } from './types'

export namespace ProductsService {
	enum Routes {
		GET_ALL_PRODUCTS = '/v1/products',
		SAVE_PRODUCT = '/v1/products/:id',
	}

	export async function getAllProducts() {
		return HttpClient.get<GetAllProductsResponse>({ url: Routes.GET_ALL_PRODUCTS })
	}

	export async function saveProduct({ id, ...rest }: SaveProductRequest) {
		const url = Routes.SAVE_PRODUCT.replace(':id', id)
		return HttpClient.put<void>({ url, body: rest })
	}
}

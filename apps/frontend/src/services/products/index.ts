import { HttpClient } from '@/services/http-client'
import type { GetAllProductsResponse } from './types'

export namespace ProductsService {
	enum Routes {
		GET_ALL_PRODUCTS = '/v1/products',
	}

	export async function getAllProducts() {
		return HttpClient.get<GetAllProductsResponse>({ url: Routes.GET_ALL_PRODUCTS })
	}
}

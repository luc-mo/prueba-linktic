import { HttpClient } from '@/services/http-client'
import type { SaveOrderRequest } from './types'

export namespace OrdersService {
	enum Routes {
		SAVE_ORDER = '/v1/orders/:id',
	}

	export const saveOrder = async ({ id, ...rest }: SaveOrderRequest) => {
		const url = Routes.SAVE_ORDER.replace(':id', id)
		return HttpClient.put<void>({ url, body: rest })
	}
}

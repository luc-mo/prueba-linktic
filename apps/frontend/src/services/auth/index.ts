import { HttpClient } from '@/services/http-client'
import type { LoginRequest, LoginResponse } from './types'

export namespace AuthService {
	enum Routes {
		LOGIN = '/v1/auth/login',
	}

	export const login = async (request: LoginRequest) => {
		return HttpClient.post<LoginResponse>({
			url: Routes.LOGIN,
			body: request,
		})
	}
}

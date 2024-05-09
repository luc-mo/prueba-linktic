import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { config } from '@/config/environment'
import { HttpError, UnexpectedError } from '@/errors'

const _isResponseError = (error: unknown): error is AxiosError => {
	const isAxiosError = error instanceof AxiosError
	const hasResponse = isAxiosError && error.response !== undefined
	return isAxiosError && hasResponse
}

const _handleError = (error: unknown) => {
	if (_isResponseError(error)) {
		throw new HttpError({
			message: error.message,
			status: error.response!.status,
			data: error.response!.data,
		})
	}
	throw new UnexpectedError('An unexpected error occurred')
}

const _instance = axios.create({
	baseURL: config.api.baseUrl,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const HttpClient = {
	instance: _instance,
	setAuthToken: (token: string) => {
		localStorage.setItem('auth-token', token)
		_instance.defaults.headers.Authorization = `Bearer ${token}`
	},
	removeAuthToken: () => {
		localStorage.removeItem('auth-token')
		_instance.defaults.headers.Authorization = null
	},
	post: async <T>({ url, body, options }: Post) => {
		const { data } = await _instance.post<T>(url, body, options).catch(_handleError)
		return data
	},
	get: async <T>({ url, options }: Get) => {
		const { data } = await _instance.get<T>(url, options).catch(_handleError)
		return data
	},
	put: async <T>({ url, body, options }: Put) => {
		const { data } = await _instance.put<T>(url, body, options).catch(_handleError)
		return data
	},
	delete: async <T>({ url, options }: Delete) => {
		const { data } = await _instance.delete<T>(url, options).catch(_handleError)
		return data
	},
}

interface Post {
	url: string
	body?: any
	options?: AxiosRequestConfig
}

interface Get {
	url: string
	options?: AxiosRequestConfig
}

interface Put {
	url: string
	body?: any
	options?: AxiosRequestConfig
}

interface Delete {
	url: string
	options?: AxiosRequestConfig
}

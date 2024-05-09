import { container } from '@/container'
import type { Request, Response, NextFunction } from 'express'

export const authTokenMiddleware = async (req: Request, _: Response, next: NextFunction) => {
	const accessToken = req.headers.authorization

	if (!accessToken) {
		return next()
	}

	try {
		const [_, token] = accessToken.split(' ')
		const cipher = container.resolve('cipher')
		const data = cipher.verifyJwt<{ id: string; role: 'admin' | 'user' }>(token)
		req.user = data
		next()
	} catch (error) {
		next()
	}
}

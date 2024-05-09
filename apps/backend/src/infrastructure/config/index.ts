import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export const config = {
	server: {
		environment: process.env.NODE_ENV!,
		port: process.env.PORT! || 3000,
		jwtSecret: process.env.JWT_SECRET!,
	},
	postgres: {
		host: process.env.POSTGRES_HOST!,
		user: process.env.POSTGRES_USER!,
		password: process.env.POSTGRES_PASSWORD!,
		database: process.env.POSTGRES_DATABASE!,
		port: Number(process.env.POSTGRES_PORT!),
		max: Number(process.env.POSTGRES_MAX!),
	},
}

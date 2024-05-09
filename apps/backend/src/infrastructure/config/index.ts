import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export const config = {
	server: {
		environment: process.env.NODE_ENV!,
		port: process.env.PORT! || 3000,
		jwtSecret: process.env.JWT_SECRET!,
	},
	postgres: {
		url: process.env.POSTGRES_URL!,
		max: Number(process.env.POSTGRES_MAX!),
	},
}

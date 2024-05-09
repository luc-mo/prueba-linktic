export class HttpError<T = any> extends Error {
	public status: number
	public data: T

	constructor({ message, status, data }: Constructor<T>) {
		super(message)
		this.status = status
		this.data = data
	}
}

interface Constructor<T = any> {
	message: string
	status: number
	data: T
}

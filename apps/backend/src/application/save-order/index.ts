import { Order } from '@/domain/order'
import { SaveOrderCommand } from './save-order-command'

export class SaveOrder {
	private readonly _orderRepository: Container['orderRepository']

	constructor({ orderRepository }: Pick<Container, 'orderRepository'>) {
		this._orderRepository = orderRepository
	}

	public async execute(command: SaveOrderCommand): Promise<void> {
		const order = new Order({
			id: command.id,
			userId: command.userId,
			products: command.products,
			shipped: command.shipped,
		})
		await this._orderRepository.save(order)
	}
}

export { SaveOrderCommand }

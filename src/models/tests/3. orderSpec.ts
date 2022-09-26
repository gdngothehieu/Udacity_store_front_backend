import { Order , OrdersStore } from '../order';

const store = new OrdersStore()

describe('3 - Test Order Model', () => {
    it('3.1 Should create order with \'complete\' status', async () => {
        const order: Order = {
            productId: 1,
            quantity: 5,
            userId: 1,
            status: 'complete'
        }
        const result = await store.Create(order)
        const response = await store.Show(1)
        expect(response.quantity).toEqual(result.quantity)
    })

    it('3.2 Should create order with \'active\' status', async () => {
        const order: Order = {
            productId: 1,
            quantity: 3,
            userId: 1,
            status: 'active'
        }
        const result = await store.Create(order)
        const response = await store.Show(2)
        expect(response.status).toEqual(result.status)
    })

    it('3.3 Should show current order by user', async () => {
        const result = await store.CurrentByUser(1)
        expect(result.status).toEqual('active')
    })

    it('3.4 Should show complete order by user', async () => {
        const result = await store.CompleteByUser(1)
        expect(result[0].status).toEqual('complete')
    })

    it('3.5 Should show order by its id', async () => {
        // We'll find them 4 as we created another 2 orders before in '3. orderRouteSpec.ts' file 
        const result = await store.Show(4)
        expect(result.quantity).toEqual(3)
    })

    it('3.6 Should show all orders', async () => {
        // We'll find them 4 as we created another 2 orders before in '3. orderRouteSpec.ts' file 
        const result = await store.Index()
        expect(result.length).toEqual(4)
    })

    it('3.7 Should add product to order that\'s active', async () => {
        const result = await store.CurrentByUser(1)
        const orderId = result.id
        const productId = 2
        const quantity = 7
        const response = await store.AddProductToOrder(orderId as number, productId, quantity)
        expect(response).toEqual({
            id: 2,
            order_id: 2,
            product_id: 2,
            quantity: 7
        })
    })

    it('3.8 Should get orders by order_id foreign key', async () => {
        const response = await store.GetOrdersById(2)
        expect(response[0].quantity).toEqual(7)
    })
})

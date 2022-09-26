import supertest from "supertest";
import app from "../../server";
import { token } from './1. userRouteSpec';

const request = supertest(app)

describe('3 - Test Order Route', () => {
    it('3.1 Should create order with \'complete\' status', (done: (err?: unknown) => void) => {
        const order = {
            productid: 1,
            quantity: 5,
            userid: 1,
            status: "complete"
        }
        request.post('/orders').send(order).set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(201).then(res => {
            done()
        }).catch(err => done(err))
    })

    it('3.2 Should create order with \'active\' status', (done: (err?: unknown) => void) => {
        const order = {
            productid: 1,
            quantity: 4,
            userid: 1,
            status: "active"
        }
        request.post('/orders').send(order).set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(201).then(res => {
            done()
        }).catch(err => done(err))
    })

    it('3.3 Should show current order by user', (done: (err?: unknown) => void) => {
        request.get('/orders/current-by-user/1')
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200).then(res => {
            done()
        }).catch(err => done(err))
    })

    it('3.4 Should show complete order by user', (done: (err?: unknown) => void) => {
        request.get('/orders/complete-by-user/1')
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200).then(res => {
            done()
        }).catch(err => done(err))
    })

    it('3.5 Should show order by its id', (done: (err?: unknown) => void) => {
        request.get('/orders/2')
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200).then(res => {
            done()
        }).catch(err => done(err))
    })

    it('3.6 Should show all orders', (done: (err?: unknown) => void) => {
        request.get('/orders')
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200).then(res => {
            console.log(res.body)
            done()
        }).catch(err => done(err))
    })

    it('3.7 Should add product to an order_id', (done: (err?: unknown) => void) => {
        const data = {
            product_id: 1,
            quantity: 6
        }
        request.post('/orders/1/products').send(data)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(201).then(res => {
            done()
        }).catch(err => done(err))
    })

    it('3.8 Should get orders by order_id foreign key', (done: (err?: unknown) => void) => {
        request.get('/orders/by_order_id/1')
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200).then(res => {
            console.log(res.body)
            done()
        }).catch(err => done(err))
    })
})

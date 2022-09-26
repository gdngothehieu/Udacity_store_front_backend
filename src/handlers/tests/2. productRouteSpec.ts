import supertest from "supertest";
import app from "../../server";
import { token } from './1. userRouteSpec';

const request = supertest(app)

describe('2 - Test Product Routes', () => {
    it('2.1 Should create new product', (done: (err?: unknown) => void) => {
        const product = {
            name: "Teama_Milk",
            price: 10,
            category: "cheese"
        }
        request.post('/products').send(product).set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(201).then(res => {
            done()
        }).catch(err => done(err))
    })

    it('2.2 Should show product by its id', (done: (err?: unknown) => void) => {
        request.get('/products/1')
        .expect("Content-Type", /json/)
        .expect(200).then(res => {
            done()
        }).catch(err => done(err))
    })

    it('2.3 Should show all products', (done: (err?: unknown) => void) => {
        request.get('/products')
        .expect("Content-Type", /json/)
        .expect(200).then(res => {
            console.log(res.body)
            done()
        }).catch(err => done(err))
    })

    it('2.4 Should return products ordered by category', (done: (err?: unknown) => void) => {
        request.post('/products/by-category')
        .expect("Content-Type", /json/)
        .expect(200).then(res => {
            done()
        }).catch(err => done(err))
    })
})

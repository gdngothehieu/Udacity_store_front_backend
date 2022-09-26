import supertest from 'supertest';
import app from '../../server';

const request = supertest(app)

export let token: string;
describe('1 - Test User Routes', () => {
    it('1.1 Should create new user', (done: (err?: unknown) => void) => {
        const user = {
            firstName: "Ahmed",
            lastName: "Khalaf",
            input_password: parseInt("6trtiu90")
        }
        request.post('/users').send(user).set("Accept", "application/json")
        .expect('Content-Type', /json/)
        .expect(201).then(res => {
            console.log(res.body)
            token = res.body
            done()
        }).catch(error => done(error))
    })

    it('1.2 Should show user by his/her id', (done: (err?: unknown) => void) => {
        request.get('/users/1').set("Authorization", `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200).then(res => {
            done()
        }).catch(error => done(error))
    })

    it('1.3 Should show all Users', (done: (err?: unknown) => void) => {
        request.get('/users').set("Authorization", `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200).then(res => {
            console.log(res.body)
            done()
        }).catch(error => done(error))
    })
})

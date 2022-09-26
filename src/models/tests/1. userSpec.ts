import { User , UsersStore } from '../user';

const store = new UsersStore()

describe('1 - Test User Model', () => {
    it('1.1 Should create new user', async () => {
        const user: User = {
            first_name: "Ahmed",
            last_name: "Khalaf",
            input_password: "6trtiu90"
        }
        const result = await store.Create(user)
        const response = await store.Show(1)
        expect(response.first_name).toEqual(result.first_name)
    })

    it('1.2 Should show user by his/her id', async () => {
        const result = await store.Show(1)
        expect(result.last_name).toEqual('Khalaf')
    })

    it('1.3 Should show all Users', async () => {
        const result = await store.Index()
        expect(result.length).toEqual(2)
    })
})

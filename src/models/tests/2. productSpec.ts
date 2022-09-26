import { Product , ProductsStore } from '../product';

const store = new ProductsStore()

describe('2 - Test Product Model', () => {
    it('2.1 Should create new product', async () => {
        const product: Product = {
            name: "Teama_Milk",
            price: 10,
            category: "cheese"
        }
        const result = await store.Create(product)
        const response = await store.Show(1)
        expect(response.name).toEqual(result.name)
    })

    it('2.2 Should show product by its id', async () => {
        const result = await store.Show(1)
        expect(result.price).toEqual(10)
    })

    it('2.3 Should show all Products', async () => {
        const result = await store.Index()
        expect(result.length).toEqual(2)
    })

    it('2.4 Should return products ordered by category', async () => {
        const result = await store.ByCategory()
        expect(result[0].category).toEqual('cheese')
    })
})

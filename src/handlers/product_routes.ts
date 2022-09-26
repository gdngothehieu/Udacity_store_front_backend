import express, { Request , Response } from 'express';
import { Product , ProductsStore } from '../models/product';
import verifyAuthToken from '../middlewares/verifyUser';

const store = new ProductsStore()

const Index = async (_req: Request, res: Response) => {
    try {
        const products = await store.Index()
        res.json(products)
    }catch (err) {
        res.status(400).json(err)
    }
}

const Show = async (req: Request, res: Response) => {
    try {
        const product = await store.Show(parseInt(req.params.id))
        res.json(product)
    }catch (err) {
        res.status(400).json(err)
    }
}

const Create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }
        const newProduct = await store.Create(product)
        res.status(201).json(newProduct)
    }catch (err) {
        res.status(400)
        res.json(err)
    }
}

const SortByCategory = async (_req: Request, res: Response) => {
    try {
        const products = await store.ByCategory()
        res.json(products)
    }catch (err) {
        res.status(400).json(err)
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', Index)
    app.get('/products/:id', Show)
    app.post('/products', verifyAuthToken, Create)
    app.post('/products/by-category', SortByCategory)
}

export default productRoutes

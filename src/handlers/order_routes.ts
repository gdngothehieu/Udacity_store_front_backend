import express, { Request , Response } from 'express';
import { Order , OrdersStore } from '../models/order';
import verifyAuthToken from '../middlewares/verifyUser';

const store = new OrdersStore()

const Index = async (req: Request, res:Response) => {
    try {
        const orders = await store.Index()
        res.json(orders)
    }catch (err) {
        res.status(400).json(err)
    }
}

const Show = async (req: Request, res:Response) => {
    try {
        const order = await store.Show(parseInt(req.params.id))
        res.json(order)
    }catch (err) {
        res.status(400).json(err)
    }
}

const Create = async (req: Request, res:Response) => {
    const order: Order = {
        productId: req.body.productid,
        quantity: req.body.quantity,
        userId: req.body.userid,
        status: req.body.status
    }
    try {
        const newOrder = await store.Create(order)
        res.status(201).json(newOrder)
    }catch (err) {
        res.status(400)
        res.json(err)
    }
}

const CurrentByUser = async (req: Request, res:Response) => {
    try {
        const userId = parseInt(req.params.userid)
        const order = await store.CurrentByUser(userId)
        res.json(order)
    }catch (err) {
        res.status(400)
        res.json(err)
    }
}

const CompleteByUser = async (req: Request, res:Response) => {
    try {
        const userId = parseInt(req.params.userid)
        const order = await store.CompleteByUser(userId)
        res.json(order)
    }catch (err) {
        res.status(400)
        res.json(err)
    }
}

const AddProductToOrder = async (req: Request, res: Response) => {
    const orderId = parseInt(req.params.id)
    const productId = req.body.product_id
    const Quantity = req.body.quantity
    try {
        const addedProduct = await store.AddProductToOrder(orderId, productId, Quantity)
        res.status(201).json(addedProduct)
    }catch (err) {
        res.status(400).json(err)
    }
}

const GetOrdersById = async (req: Request, res: Response) => {
    const orderId = parseInt(req.params.id)
    try {
        const orders = await store.GetOrdersById(orderId)
        res.json(orders)
    }catch (err) {
        res.status(400).json(err)
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, Index)
    // Get order by its id
    app.get('/orders/:id', verifyAuthToken, Show)
    app.post('/orders', verifyAuthToken, Create)
    app.get('/orders/current-by-user/:userid', verifyAuthToken, CurrentByUser)
    app.get('/orders/complete-by-user/:userid', verifyAuthToken, CompleteByUser)
    app.post('/orders/:id/products', verifyAuthToken, AddProductToOrder)
    // Get orders by order_id foreign key
    app.get('/orders/by_order_id/:id', verifyAuthToken, GetOrdersById)
}

export default orderRoutes

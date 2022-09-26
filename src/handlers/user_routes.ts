import express, { Request , Response } from 'express';
import { User , UsersStore } from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middlewares/verifyUser';

const store = new UsersStore()

const Index = async (_req: Request, res: Response) => {
    try {
        const users = await store.Index()
        res.json(users)
    }catch (err) {
        res.status(400).json(err)
    }
}

const Show = async (req: Request, res: Response) => {
    try {
        const user = await store.Show(parseInt(req.params.id))
        res.json(user)
    }catch (err) {
        res.status(400).json(err)
    }
}

const Create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            input_password: req.body.input_password
        }
        const newUser = await store.Create(user)
        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string)
        res.status(201).json(token)
    }catch (err) {
        res.status(400)
        res.json(err)
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, Index)
    app.get('/users/:id', verifyAuthToken, Show)
    app.post('/users', Create)
}

export default userRoutes

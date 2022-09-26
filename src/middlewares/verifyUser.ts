import { NextFunction, Request , Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = async (req: Request, res: Response, next: NextFunction) => {
    const authorizeHeader = req.headers.authorization
    const token = authorizeHeader?.split(' ')[1]
    try {
        jwt.verify(token as string, process.env.TOKEN_SECRET as string)
        next()
    }catch (err) {
        res.status(401)
        res.json(`Invalid token ${err}`)
    }
}

export default verifyAuthToken

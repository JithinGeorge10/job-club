import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express'
import { JWT_KEY } from '../../utils/config';

export const authenticateToken = ( req: Request, res: Response, next: NextFunction):any=> {
    
    const token = req.cookies['userToken'];
    
    if (!token) {
        return res.send({failToken:true})
    }
    try {

        const verified = jwt.verify(token, JWT_KEY as string);
        
        next(); 
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
}

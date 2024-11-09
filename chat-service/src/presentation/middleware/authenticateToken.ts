import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express'
import { JWT_KEY } from '../../utils/config';

export const authenticateToken = ( req: Request, res: Response, next: NextFunction):any=> {
    console.log('reached auth');
    
    const token = req.cookies['userToken'];
    
    console.log(token)
    if (!token) {
        return res.send({failToken:true})
    }
    try {

        const verified = jwt.verify(token, JWT_KEY as string);
        console.log(verified);
        
        next(); 
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
}

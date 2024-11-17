import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { JWT_KEY } from '../../utils/config';
interface AuthenticatedRequest extends Request {
    admin?: {
        admin: string;
        role: string;
        iat: number;
        exp: number;
    };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {

    const token = req.cookies['adminToken'];

    if (!token) { 
        return res.send({ failToken: true });
    }
    try {
        const verified = jwt.verify(token, JWT_KEY as string) as {
            admin: string;
            role: string;
            iat: number;
            exp: number;
        };
        console.log(verified)
        req.admin = verified; 
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

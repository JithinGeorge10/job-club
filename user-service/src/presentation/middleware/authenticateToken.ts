import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { JWT_KEY } from '../../utils/config';
interface AuthenticatedRequest extends Request {
    user?: {
        user: string;
        role: string;
        iat: number;
        exp: number;
    };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {

    const token = req.cookies['userToken'];

    if (!token) {
        return res.send({ failToken: true });
    }
    try {
        const verified = jwt.verify(token, JWT_KEY as string) as {
            user: string;
            role: string;
            iat: number;
            exp: number;
        };
        req.user = verified; 
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

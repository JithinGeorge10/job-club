import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { JWT_KEY } from '../../utils/constants';
interface AuthenticatedRequest extends Request {
    user?: {
        user: string;
        role: string;
        iat: number;
        exp: number;
    };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {

    const accesstoken = req.cookies['userAccessToken'];
    const refreshtoken = req.cookies['userRefreshToken'];

    if (!accesstoken) {
        return res.send({ failToken: true });
    }
    try {
        if (accesstoken) {
            const verified = jwt.verify(accesstoken, JWT_KEY as string) as {
                user: string;
                role: string;
                iat: number;
                exp: number;
            };
            console.log(verified);

            req.user = verified;
            next();
        } else if (refreshtoken) {
            const verified = jwt.verify(refreshtoken, JWT_KEY as string) as {
                user: string;
                role: string;
                iat: number;
                exp: number;
            };
            console.log('verified' + verified)


            const newAccessToken = jwt.sign(
                { id: verified.user, role: verified.role },
                JWT_KEY,
                { expiresIn: '1h' }
            );

            req.user = verified;
            next();
        }

    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
}

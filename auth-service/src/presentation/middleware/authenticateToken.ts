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
    const tokens = {
        userAccessToken: req.cookies['userAccessToken'],
        userRefreshToken: req.cookies['userRefreshToken'],
        companyAccessToken: req.cookies['companyAccessToken'],
        companyRefreshToken: req.cookies['companyRefreshToken'],
        adminAccessToken: req.cookies['adminAccessToken'],
        adminRefreshToken: req.cookies['adminRefreshToken'],
    };

    const accessToken = tokens.userAccessToken || tokens.companyAccessToken || tokens.adminAccessToken;
    const refreshToken = tokens.userRefreshToken || tokens.companyRefreshToken || tokens.adminRefreshToken;

    if (!accessToken) {
        return res.status(401).json({ failToken: true, message: 'No access token provided' });
    }

    try {
      
        if (accessToken) {
            const verified = jwt.verify(accessToken, JWT_KEY as string) as {
                user: string;
                role: string;
                iat: number;
                exp: number;
            };

            req.user = verified; 
            return next();
        }
        if (refreshToken) {
            const verified = jwt.verify(refreshToken, JWT_KEY as string) as {
                user: string;
                role: string;
                iat: number;
                exp: number;
            };

          
            const newAccessToken = jwt.sign(
                { user: verified.user, role: verified.role },
                JWT_KEY,
                { expiresIn: '1h' }
            );

            res.cookie('userAccessToken', newAccessToken, { httpOnly: true });
            req.user = verified; 
            return next();
        }

     
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    } catch (err) {
   
        return res.status(400).json({ message: 'Invalid token', error: err });
    }
};

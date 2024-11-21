import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../utils/config';

export class JwtService {
    async createAccessToken(user: Object | undefined, role: String): Promise<String | undefined> {
        try {
            if (role == 'user') {
                const syncToken = jwt.sign({ user, role: 'user' }, String(JWT_SECRET), { expiresIn: "1h" });
                return syncToken;
            }
            if (role == 'company') {
                const syncToken = jwt.sign({ user, role: 'company' }, String(JWT_SECRET), { expiresIn: "1h" });
                return syncToken
            }
            if (role == 'admin') {
                const syncToken = jwt.sign({ user, role: 'admin' }, String(JWT_SECRET), { expiresIn: "1h" });
                return syncToken
            }
        } catch (error) {
            throw error
        }
    }
    async createRefreshToken(user: Object | undefined, role: String): Promise<String | undefined> {
        try {
            if (role == 'user') {
                const syncToken = jwt.sign({ user, role: 'user' }, String(JWT_SECRET), { expiresIn: "7d" });
                return syncToken;
            }
            if (role == 'company') {
                const syncToken = jwt.sign({ user, role: 'company' }, String(JWT_SECRET), { expiresIn: "7d" });
                return syncToken
            }
            if (role == 'admin') {
                const syncToken = jwt.sign({ user, role: 'admin' }, String(JWT_SECRET), { expiresIn: "7d" });
                return syncToken
            }
        } catch (error) {
            throw error
        }
    }

}
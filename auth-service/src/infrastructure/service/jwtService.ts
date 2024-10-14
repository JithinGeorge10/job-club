import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../utils/config';

export class UserJwtService {
    async createJwt(user: Object, role: String): Promise<String | undefined> {
        try {
            if (role == 'user') {
                const syncToken = jwt.sign({ user, role: 'user' }, JWT_SECRET, { expiresIn: "1h" });
                return syncToken
            }
          
        } catch (error) {
            throw error
        }
    }
}
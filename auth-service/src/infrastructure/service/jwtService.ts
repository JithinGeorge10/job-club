import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../utils/config';

export class JwtService {
    async createJwt(user: Object|undefined, role: String): Promise<String | undefined> {
        try {
            if (role == 'user') {
                const syncToken = jwt.sign({ user, role: 'user' }, JWT_SECRET, { expiresIn: "1h" });
                return syncToken
            }
            if(role=='company'){
                const syncToken = jwt.sign({ user, role: 'company' }, JWT_SECRET, { expiresIn: "1h" });
                return syncToken
            }
            if(role=='admin'){
                const syncToken = jwt.sign({ user, role: 'admin' }, JWT_SECRET, { expiresIn: "1h" });
                return syncToken
            }            
        } catch (error) {
            throw error
        }
    }
    
}

import UserRepository from '../../../infrastructure/database/mongooseUserRepository'
export class UserService {
    async createUser(userData: any) {
        try {
           
            const existingUser = await UserRepository.addUser(userData)

        } catch (error) {
            throw error
        }
    }
}
import { User } from "../../../domain/entities/user";

export class UserService {
   async createUser(userData: User): Promise<string | undefined> {
    try {
      console.log(userData);
      return 'UserCreatedSuccessfully';
    } catch (error) {
      console.error(error);
    }
  }
}

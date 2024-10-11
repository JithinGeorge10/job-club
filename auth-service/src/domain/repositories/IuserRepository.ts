
import { User } from "../entities/user";


export interface IUserRepository{

    findUserByEmail(email:string): Promise<User |null>; 
   
}
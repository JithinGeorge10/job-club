
import { User } from "../entities/user";


export interface IUserRepository{

    // createUser(user:User):Promise<User>;
    findUserByEmail(email:string): Promise<User |null>;   
    // insertUserDetails(user:User):Promise<void>;
    // loginVerifyQuery(userEmail:string):Promise<User | null> ;
    // ischeckEmail(userEmail:string): Promise<string | undefined> ;
    // setNewPassWord(customerId:string,newPass:string) :Promise<void> ;
    // getDataFindById(userId:string) : Promise<User | null>
    // Profile(_id:string) : Promise<User | null>
    // updateprofile({username,PhoneNumber,EmailAddress,profile}:editprofileTypes) : Promise<void>
}
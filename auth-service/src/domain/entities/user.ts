  
export interface User{
    _id? : string,
    firstName : string,
    lastName : string,
    phone:Number,
    email : string,
    password : string,
    confirmPassword : string,
    isBlock ? : boolean
    createAt? :Date,
    updatedAt? : Date
}
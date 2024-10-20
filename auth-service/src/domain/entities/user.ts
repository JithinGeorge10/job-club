import { ObjectId } from 'mongodb';

export interface User{
    _id? : ObjectId,
    firstName : string,
    lastName : string,
    phone:Number,
    email : string,
    password : string,
    createdAt?: Date;
    updatedAt?: Date;
    isVerified:boolean
}

export interface OTP{
    _id? : ObjectId,
    otpCode:number,
    createdAt:Date
}


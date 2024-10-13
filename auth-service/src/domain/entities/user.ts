import { ObjectId } from 'mongodb';

export interface User{
    _id? : ObjectId,
    firstName : string,
    lastName : string,
    phone:Number,
    email : string,
    password : string,
    isBlock: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface OTP{
    _id? : ObjectId,
    otpCode:number,
    createdAt:Date
}
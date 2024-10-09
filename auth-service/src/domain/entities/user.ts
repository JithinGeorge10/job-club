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
import { ObjectId } from 'mongodb';
export interface Company{
    _id? : ObjectId,
    companyName : string,
    password : string,
    description:string,
    email : string,
    industry : string,
    location: string;
    website:string
    createdAt?: Date;
    updatedAt?: Date;
}
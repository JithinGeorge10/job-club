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

import { Types } from 'mongoose';

export interface Job {
    companyId: Types.ObjectId;  // Reference to Company model
    jobTitle: string;
    employmentType: string[];  // Array of employment types (e.g., 'Full time', 'Part time')
    startDate: Date;
    endDate: Date;
    minSalary: number;
    maxSalary: number;
    category: string;
    slots: number;
    jobDescription: string;
    qualification: string;
    jobResponsibilities: string;
    requirements: string;
    skills: Array<Record<string, any>>;  // Array of objects representing skills
    createdAt?: Date;
    updatedAt?: Date;
}

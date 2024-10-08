import { Request, Response } from "express";
export const userSignupController=async(req:Request,res:Response)=>{
try {
    console.log(req.body)
} catch (error) {
    console.log(error);
    
}
}
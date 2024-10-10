
import {NextFunction, Request, Response} from 'express'
export const errorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
    console.log('errhanlde'+err.message);
    let errorMessage=err?.message ||'An unexpected error'
    res.send({errorMessage,success:false})
}
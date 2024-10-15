import { NextRequest } from 'next/server';

export const companyVerifyToken=async(companyToken:string,req:NextRequest):Promise<boolean>=>{

    const token = req.cookies.get(companyToken);
  
    if (!token?.value) {
      return false;
    }
    return true
  
  }
import { NextRequest } from 'next/server';

export const adminVerifyToken = async (adminToken: string, req: NextRequest): Promise<boolean> => {

    const token = req.cookies.get(adminToken);
  
    if (!token?.value) {
        return false;
    }
    return true

}
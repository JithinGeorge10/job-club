import { NextRequest } from 'next/server';
import { JWT_SECRET } from '@/utils/constants';
import { jwtVerify } from 'jose';
export const companyVerifyToken = async (companyToken: string, req: NextRequest): Promise<boolean> => {
  const secret = JWT_SECRET;
  const token = req.cookies.get(companyToken);
  console.log('token'+token);
  console.log('token'+token?.value);
  if (!token?.value) {
    return false;
  }
  try {
    const { payload } = await jwtVerify(token.value, new TextEncoder().encode(secret));
    return !!payload;

  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }

}





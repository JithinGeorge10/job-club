import { JWT_SECRET } from '@/utils/constants';
import { jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

export const userVerifyToken = async (userToken: string, req: NextRequest): Promise<boolean> => {
  const secret = JWT_SECRET;
  const token = req.cookies.get(userToken);
  console.log('token'+token);
  console.log('token'+token?.value);
  if (!token?.value) {
    return false;
  }
  try {
    const { payload } = await jwtVerify(token.value, new TextEncoder().encode(secret));
    console.log('payload'+payload);
    
    return !!payload;

  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};

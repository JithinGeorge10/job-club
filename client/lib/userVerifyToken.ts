import { NextRequest } from 'next/server';


export const userVerifyToken = async (userToken: string, req: NextRequest): Promise<boolean> => {

  const token = req.cookies.get(userToken);
  console.log(token)
  if (!token?.value) {
    return false;
  }
  return true

}


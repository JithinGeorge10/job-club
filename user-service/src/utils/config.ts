import dotenv from 'dotenv'
dotenv.config();

export const MONGO_URL: string = process.env.MONGOURL!;
export const PORT: string = process.env.PORT!;
export const CLIENT_PORT: string = process.env.CLIENT_PORT!;
export const JWT_SECRET: string = process.env.JWT_SECRET!;
export const ADMIN_MAIL:string = process.env.ADMIN_MAIL!;
export const ADMIN_PASSWORD:string = process.env.ADMIN_PASSWORD!;
export const JWT_KEY:string = process.env.JWT_KEY!;
export const PAYU_MERCHANT_KEY:string = process.env.PAYU_MERCHANT_KEY!;
export const PAYU_MERCHANT_SALT:string = process.env.PAYU_MERCHANT_SALT!;
export const PAYU_TEST_URL:string = process.env.PAYU_TEST_URL!;




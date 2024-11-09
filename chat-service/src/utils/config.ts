import dotenv from 'dotenv'
dotenv.config();

export const PORT: string = process.env.PORT!;
export const CLIENT_PORT: string = process.env.CLIENT_PORT!;
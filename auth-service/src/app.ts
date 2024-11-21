import express from 'express'
import cors from 'cors'
import morgan from "morgan";
import {connectDB} from "./infrastructure/config/databaseConfig"
import {PORT,CLIENT_PORT} from './utils/constants'
import {errorHandler} from './presentation/middleware/errorHandler'
import userRoute from './presentation/routes/userRoute';
import companyRoute from './presentation/routes/companyRoute';
import adminRoute from './presentation/routes/adminRoute';
import cookieParser from 'cookie-parser'
const app=express()
app.use(express.json());

connectDB()
app.use(cors({
    origin: CLIENT_PORT, 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Role'],
    credentials: true
  }));
  app.use(cookieParser());
  app.use(morgan("dev")); 

  app.use("/api/auth-service", userRoute);
  app.use("/api/auth-service", companyRoute);
  app.use("/api/auth-service", adminRoute);

  app.use(errorHandler)

app.listen(PORT,()=>{
    console.log('app started')
})
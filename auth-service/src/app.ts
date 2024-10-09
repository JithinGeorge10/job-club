import express from 'express'
import cors from 'cors'
import morgan from "morgan";
import {connectDB} from "./infrastructure/config/databaseConfig"
import userSignupRoute from "./presentation/routes/userSignupRoute";
import {PORT,CLIENT_PORT} from './utils/config'
const app=express()
app.use(express.json());

connectDB()
app.use(cors({
    origin: CLIENT_PORT, 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Role'],
    credentials: true
  }));
  
  app.use(morgan("dev")); 


  app.use("/api/auth-service", userSignupRoute);


app.listen(PORT,()=>{
    console.log('app started')
})
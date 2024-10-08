import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import morgan from "morgan";
import userSignupRoute from "./presentation/routes/userSignupRoute";

const app=express()
dotenv.config();
app.use(express.json());


app.use(cors({
    origin: process.env.CLIENT_PORT, 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Role'],
    credentials: true
  }));
  
  app.use(morgan("dev")); 


  app.use("/api/auth-service", userSignupRoute);


app.listen(process.env.PORT,()=>{
    console.log('app started')
})
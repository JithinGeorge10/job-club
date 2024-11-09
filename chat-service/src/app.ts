import express from 'express'
import cors from 'cors'
import morgan from "morgan";
import cookieParser from 'cookie-parser'
import { PORT, CLIENT_PORT } from './utils/config'
import consume from './infrastructure/service/consume'
import {connectDB} from "./infrastructure/config/databaseConfig"

const app = express()
app.use(express.json());
connectDB()
app.use(cors({
    origin: CLIENT_PORT,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Role'],
    credentials: true
}));

app.use(morgan("dev"));
app.use(cookieParser());
consume()

app.listen(PORT, () => {
    console.log('app started')
})
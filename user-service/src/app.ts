import express from 'express'
import cron from 'node-cron';
import { PORT, CLIENT_PORT } from './utils/constants'
import cors from 'cors'
import morgan from "morgan";
import cookieParser from 'cookie-parser'
import {connectDB} from "./infrastructure/config/databaseConfig"
import {errorHandler} from './presentation/middleware/errorHandler'
import consume from './infrastructure/service/consume'
import userRoute from './presentation/routes/userRoute'
import {UserService} from './app/useCases/User/getUser';

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

app.use("/api/user-service", userRoute);

app.use(errorHandler)

const userService = new UserService(); 

cron.schedule('0 0 * * *', async () => {
    try {
        const expiredCount = await userService.handleSubscriptionExpiry();
    } catch (error) {
        console.error('Error running subscription expiry job:', error);
    }
});
app.listen(PORT, () => {
    console.log('app started')
})
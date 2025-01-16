import express from 'express'
import { PORT, CLIENT_PORT } from './utils/config'
import cors from 'cors'
import morgan from "morgan";
import cookieParser from 'cookie-parser'
import { connectDB } from "./infrastructure/config/databaseConfig"
import companyRoute from './presentation/routes/companyRoute'
import consume from './infrastructure/service/consume'
const app = express()
app.use(express.json());
connectDB()
const corsOptions = {
    origin: (origin: any, callback: any) => {
        const allowedOrigins = ['https://jobclub.live'];
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(morgan("dev"));
app.use(cookieParser());
consume()

app.use("/", companyRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}) 
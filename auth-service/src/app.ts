import express from 'express'
import cors from 'cors'
import morgan from "morgan";
import { connectDB } from "./infrastructure/config/databaseConfig"
import { CLIENT_PORT, PORT } from './utils/constants'
import { errorHandler } from './presentation/middleware/errorHandler'
import userRoute from './presentation/routes/userRoute';
import companyRoute from './presentation/routes/companyRoute';
import adminRoute from './presentation/routes/adminRoute';
import cookieParser from 'cookie-parser'
const app = express()
app.use(express.json());

connectDB()
const corsOptions = {
  origin: 'https://jobclub.live', 
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true
};


app.use(cors(corsOptions));

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/", userRoute);
app.use("/", companyRoute);
app.use("/", adminRoute);

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
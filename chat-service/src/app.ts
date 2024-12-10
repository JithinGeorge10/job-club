import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import { PORT, CLIENT_PORT } from './utils/config';
import consume from './infrastructure/service/consume';
import { connectDB } from "./infrastructure/config/databaseConfig";
import chatRoute from './presentation/routes/chatRoute';
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app); 
const io = new Server(httpServer, {
    cors: {
        origin: CLIENT_PORT,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Role'],
        credentials: true,
    },
});

app.use(express.json());
connectDB();
const corsOptions = {
    origin: (origin: any, callback: any) => {
        const allowedOrigins = [CLIENT_PORT];
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
consume();
app.use("/api/chat-service", chatRoute);


io.on("connection", (socket) => {

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
    });

    socket.on("sendMessage", (messageData) => {
        const { roomId, message, sender } = messageData;
        io.to(roomId).emit("receiveMessage", { message, sender,roomId });
    });

    socket.on("disconnect", () => {
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

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
app.use(cors({
    origin: CLIENT_PORT,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Role'],
    credentials: true
}));

app.use(morgan("dev"));
app.use(cookieParser());
consume();
app.use("/api/chat-service", chatRoute);


io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    socket.on("sendMessage", (messageData) => {
        console.log(messageData);
        const { roomId, message, sender } = messageData;
        io.to(roomId).emit("receiveMessage", { message, sender });
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

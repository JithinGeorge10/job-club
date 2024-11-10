import { Router } from "express";
import { ChatController } from "../controller/chatController";
const chatRoute = Router()
const chatController = new ChatController();

chatRoute.post('/sendMessage', chatController.postChatController.bind(chatController));
chatRoute.post('/createRoom', chatController.createController.bind(chatController));


export default chatRoute
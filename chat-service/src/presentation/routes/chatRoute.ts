import { Router } from "express";
import { ChatController } from "../controller/chatController";
const chatRoute = Router()
const chatController = new ChatController();

chatRoute.post('/createRoom', chatController.createController.bind(chatController));
chatRoute.post('/postMessage', chatController.postMessageController.bind(chatController));



export default chatRoute
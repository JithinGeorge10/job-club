import { Router } from "express";
import { ChatController } from "../controller/chatController";
import {authenticateToken} from '../middleware/authenticateToken'
const chatRoute = Router()
const chatController = new ChatController();

chatRoute.post('/sendMessage', chatController.postChatController.bind(chatController));

export default chatRoute
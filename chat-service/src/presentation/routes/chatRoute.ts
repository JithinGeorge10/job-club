import { Router } from "express";
import { ChatController } from "../controller/chatController";
const chatRoute = Router()
const chatController = new ChatController();

chatRoute.post('/createRoom', chatController.createController.bind(chatController));
chatRoute.post('/postMessage', chatController.postMessageController.bind(chatController));
chatRoute.get('/getRoomDetails', chatController.getRoomDetailsController.bind(chatController));
chatRoute.get('/userRoomDetails', chatController.userRoomDetailsController.bind(chatController));



export default chatRoute
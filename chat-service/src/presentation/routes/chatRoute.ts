import { Router } from "express";
import { ChatController } from "../controller/chatController";
import { authenticateToken } from '../middleware/authenticateToken'
const chatRoute = Router()
const chatController = new ChatController();

chatRoute.post('/createRoom',  chatController.createController.bind(chatController));
chatRoute.post('/postMessage',  chatController.postMessageController.bind(chatController));
chatRoute.get('/getRoomDetails',  chatController.getRoomDetailsController.bind(chatController));
chatRoute.get('/getMessages', chatController.getMessagesController.bind(chatController));
chatRoute.get('/getUserRoomDetails',  chatController.getUserRoomDetailsController.bind(chatController));
chatRoute.post('/sendNotifications',  chatController.sendNotificationsController.bind(chatController));
chatRoute.get('/getNotifications',chatController.getNotificationsController.bind(chatController));


export default chatRoute
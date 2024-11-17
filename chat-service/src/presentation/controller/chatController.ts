import { Request, Response, NextFunction } from "express";

import { ChatService } from '../../app/useCases/Chat/chatService'

export class ChatController {
    private chatService: ChatService;
    constructor() {
        this.chatService = new ChatService();
    }
    async postMessageController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const chatDetails = await this.chatService.saveChatDetails(req.body)
            res.status(200).send({ chatDetails })
        } catch (error) {
            next(error)
        }
    }
    async createController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const chatRoom = await this.chatService.createRoom(req.body)
            res.status(200).send({ chatRoom })
        } catch (error) {
            next(error)
        }
    }
    async getRoomDetailsController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const companyId = req.query.companyId as string;
            const getRoom = await this.chatService.getRoom(companyId)
            res.status(200).send({ getRoom })
        } catch (error) {
            next(error)
        }
    }
    async getUserRoomDetailsController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.query.userId as string;
            const getRoom = await this.chatService.getUserRoom(userId)
            res.status(200).send({ getRoom })
        } catch (error) {
            next(error)
        }
    }



    async getMessagesController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const roomId = req.query.roomId as string;
            const getMessages = await this.chatService.getMessages(roomId)
            res.status(200).send({ getMessages })

        } catch (error) {
            next(error)
        }
    }
    async sendNotificationsController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const saveNotification = await this.chatService.saveNotification(req.body)
            res.status(200).send({ saveNotification })

        } catch (error) {
            next(error)
        }
    }

    async getNotificationsController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.query.userId as string;
            const notifications = await this.chatService.notifications(userId)
            res.status(200).send({ notifications })
        } catch (error) {
            next(error)
        }
    }



}

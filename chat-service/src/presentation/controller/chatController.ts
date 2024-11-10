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


}

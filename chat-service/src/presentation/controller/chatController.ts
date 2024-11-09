import { Request, Response, NextFunction } from "express";

import { ChatService } from '../../app/useCases/Chat/chatService'

export class ChatController {
    private chatService: ChatService;
    constructor() {
        this.chatService = new ChatService();
    }
    async postChatController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log(req.body)
            const chatDetails = await this.chatService.saveChatDetails(req.body)
            res.status(200).send({ chatDetails })
        } catch (error) {
            next(error)
        }
    }
   
}

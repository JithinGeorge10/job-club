
import ChatRepository from '../../../infrastructure/database/mongooseChatRepository'
export class ChatService {
    async createRoom(roomDetails:any) {
        try {
            const createRoom = await ChatRepository.createRoom(roomDetails)
            return createRoom
        } catch (error) {
            throw error
        }
    }
    async saveChatDetails(chatDetails:any) {
        try {
            const postMesssage = await ChatRepository.postMessage(chatDetails)
            return postMesssage
        } catch (error) {
            throw error
        }
    }
    
}


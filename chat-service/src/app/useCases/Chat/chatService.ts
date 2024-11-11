
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
    async getRoom(companyId:any) {
        try {
            const getRoom = await ChatRepository.getRoom(companyId)
            return getRoom
        } catch (error) {
            throw error
        }
    }
    // async getUserRoom(roomId:any) {
    //     try {
    //         const getUserRoom = await ChatRepository.getUserRoom(roomId)
    //         return getUserRoom
    //     } catch (error) {
    //         throw error
    //     }
    // }
    async getMessages(roomId:any) {
        try {
            const getMessages = await ChatRepository.getMessages(roomId)
            return getMessages
        } catch (error) {
            throw error
        }
    }
    
    
    
    
}


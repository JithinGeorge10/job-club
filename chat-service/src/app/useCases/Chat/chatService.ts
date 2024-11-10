
import ChatRepository from '../../../infrastructure/database/mongooseChatRepository'
export class ChatService {
    async createRoom(roomDetails:any) {
        try {

            const createRoom = await ChatRepository.createRoom(roomDetails)

        } catch (error) {
            throw error
        }
    }
}



import ChatRepository from '../../../infrastructure/database/mongooseChatRepository'
export class ChatService {
    async saveChatDetails(messageDetails:any) {
        try {

            const company = await ChatRepository.addMessage(messageDetails)

        } catch (error) {
            throw error
        }
    }
}


import messageModel from "./model/messageModel";
class ChatRepository {
    async addMessage(messageDetails:any) {
        try {
           console.log(messageDetails)
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
const getChatRepository = new ChatRepository();

export default getChatRepository;
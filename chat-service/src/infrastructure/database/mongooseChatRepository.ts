import messageModel from "./model/messageModel";
class ChatRepository {
    async addMessage(messageDetails:any) {
        try {
            const { userId, companyId, message } = messageDetails
            const newMessage = new messageModel({ sender:userId, receiver:companyId, message });
            const savedMessage = await newMessage.save();
            return savedMessage; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
const getChatRepository = new ChatRepository();

export default getChatRepository;
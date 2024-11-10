import roomModel from "./model/roomModel";
import messageModel from "./model/messageModel";


class ChatRepository {
    async createRoom(messageDetails: any) {
        try {
            const { userId, companyId } = messageDetails;
            const existingRoom = await roomModel.findOne({ userId, companyId });
            console.log(existingRoom)
            if (existingRoom) {
                return existingRoom;
            }
            const newRoom = new roomModel({ userId, companyId });
            const savedRoom = await newRoom.save();
            return savedRoom;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async postMessage(messageDetails: any) {
        try {
            console.log(messageDetails);
            const { sender, receiver, roomId, message } = messageDetails;

            const newMessage = new messageModel({
                sender,
                receiver,
                roomId,
                message
            });

            await newMessage.save();

            await roomModel.findByIdAndUpdate(
                roomId,
                { lastMessage: message },
                { new: true } 
            );
            
            return newMessage;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}
const getChatRepository = new ChatRepository();

export default getChatRepository;
import roomModel from "./model/roomModel";
class ChatRepository {
    async createRoom(messageDetails: any) {
        try {
            const { userId, companyId } = messageDetails;
            const existingRoom = await roomModel.findOne({ userId, companyId });
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
}
const getChatRepository = new ChatRepository();

export default getChatRepository;
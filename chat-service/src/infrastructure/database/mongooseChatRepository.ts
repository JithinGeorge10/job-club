import roomModel from "./model/roomModel";
import messageModel from "./model/messageModel";
import userModel from "./model/userModel";

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

    async postMessage(messageDetails: any) {
        try {
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

    async getRoom(companyId: string) {
        try {
          
            
            // Fetch rooms for the given companyId
            const rooms = await roomModel.find({ companyId });
    
            // Create an array of userId values from rooms
            const userIds = rooms.map(room => room.userId);
    
            // Fetch user details for each userId
            const userDetails = await Promise.all(userIds.map(async (userId) => {
                const user = await userModel.findById(userId);
                return user ? { firstName: user.firstName, lastName: user.lastName } : null;
            }));
    
            // Combine room and user details, adding userId, roomId (as a string)
            const roomDetails = rooms.map((room, index) => ({
                userId: room.userId, // userId from the room document
                roomId: room._id.toString(), // convert ObjectId to string
                firstName: userDetails[index] ? userDetails[index].firstName : null,
                lastName: userDetails[index] ? userDetails[index].lastName : null,
                lastMessage: room.lastMessage,
                timestamp: room.timestamp,
            }));
    
    
            return roomDetails;
        } catch (error) {
            console.error("Error fetching room details:", error);
            throw error;
        }
    }
    
    
    async getUserRoom(userId: string) {
        try {
            const rooms = await roomModel.find({ userId })

            return rooms;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getMessages(roomId:any) {
        try {
            const rooms = await messageModel.find({ roomId })
            return rooms
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    

}
const getChatRepository = new ChatRepository();

export default getChatRepository;
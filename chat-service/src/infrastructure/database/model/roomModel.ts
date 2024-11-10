import mongoose from "mongoose";
const chatRoom = new mongoose.Schema({
    userId: String,
    companyId: String,
    lastMessage:String,
    timestamp: { type: Date, default: Date.now },
})


const roomModel = mongoose.model('chatRoom', chatRoom)

export default roomModel

import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
})


const messageModel = mongoose.model('Message', messageSchema)

export default messageModel

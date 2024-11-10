import mongoose from "mongoose";
const message = new mongoose.Schema({
    sender: String,
    receiver: String,
    roomId:String,
    message:String,
    timestamp: { type: Date, default: Date.now },
})


const messageModel = mongoose.model('message', message)

export default messageModel

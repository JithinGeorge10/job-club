import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
   
})


const messageModel = mongoose.model('Message', messageSchema)

export default messageModel

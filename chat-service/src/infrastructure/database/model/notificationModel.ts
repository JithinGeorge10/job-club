import mongoose, { Schema, Document, Types } from 'mongoose';

interface Message {
  message: string;
  sender: Types.ObjectId;  // Reference to Company model's ObjectId
  roomId: string;
}

interface NotificationDocument extends Document {
  userId: string;
  messages: Message[];
  createdAt: Date;
}

const NotificationSchema = new Schema<NotificationDocument>({
  userId: {
    type: String,
    required: true,
  },
  messages: [
    {
      message: {
        type: String,
        required: true,
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',  // Reference to Company model
        required: true,
      },
      roomId: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const notificationModel = mongoose.model<NotificationDocument>('Notification', NotificationSchema);
export default notificationModel;

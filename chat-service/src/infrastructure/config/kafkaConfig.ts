import {Kafka} from 'kafkajs'
const kafka = new Kafka({
    clientId: "chat-service",
    brokers: [String(process.env.KAFKA_BROKER)]
})

export default kafka

   



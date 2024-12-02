
import {Kafka} from 'kafkajs'
const kafka = new Kafka({
    clientId: "auth-service",
    brokers: [process.env.KAFKA_BROKER ||'localhost:9092']
})

export default kafka

 



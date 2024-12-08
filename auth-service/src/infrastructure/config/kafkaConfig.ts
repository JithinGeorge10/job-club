import {Kafka} from 'kafkajs'
const kafka = new Kafka({
    clientId: "auth-service",
    brokers: [String('kafka-service:9092')],
})

export default kafka

 

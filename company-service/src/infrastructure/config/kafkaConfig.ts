import {Kafka} from 'kafkajs'
const kafka = new Kafka({
    clientId: "company-service",
    brokers: [String('kafka-service:9092')],
})
export default kafka

 



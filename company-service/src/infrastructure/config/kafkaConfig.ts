
import {Kafka} from 'kafkajs'
const kafka = new Kafka({
    clientId: "company-service",
    brokers: ['localhost:9092']
})

export default kafka

 


import {Kafka} from 'kafkajs'
const kafka = new Kafka({
    clientId: 'user-service',
    brokers: [String(process.env.KAFKA_BROKER)]
});

export default kafka

 



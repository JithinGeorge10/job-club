
import {Kafka} from 'kafkajs'
console.log('Kafka Broker:', process.env.KAFKA_BROKER);
const kafka = new Kafka({
    clientId: 'user-service',
    brokers: ['kafka-service:9092'] // Default to localhost if not set
});

export default kafka

 



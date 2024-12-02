import kafka from '../config/kafkaConfig'
import {Partitioners} from 'kafkajs'


async function produce(topic:string, message:any) {
    try {
        const producer = kafka.producer({createPartitioner: Partitioners.LegacyPartitioner})
        await producer.connect()
        await producer.send({
            topic,
            messages: [{
                value:JSON.stringify(message)
            }]
        })
        await producer.disconnect()
    } catch (error) {
        console.log(error);
    }
}


export default produce
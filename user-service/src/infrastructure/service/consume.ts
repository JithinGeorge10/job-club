
import kafka from '../config/kafkaConfig'
async function consume() {
  console.log('kafka consume')

  try {
    const consumer = kafka.consumer({ groupId: "user-group" });
    await consumer.connect();
    await consumer.subscribe({
      topics: ["add-user",'delete-user'],
      fromBeginning: true,
    });
    console.log("post adding user");
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log('gotcha');
        console.log(message);
        console.log(topic);
        console.log(partition);
        if(message.value){
            console.log({
                value: message.value.toString(),
              })
              const value = JSON.parse(message.value.toString());
              console.log('value');
              console.log(value);
              if (topic === "add-user") {
                console.log('adduser reached');
                
                console.log(value)
               }
        }
      },
    })
  } catch (error) {
    console.log('kafka error')
    console.log(error);
  }
}
export default consume;


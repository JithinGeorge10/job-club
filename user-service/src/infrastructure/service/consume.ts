
import kafka from '../config/kafkaConfig'
import { UserService } from '../../app/useCases/addUser/addUser'
async function consume() {
  console.log('kafka consume')

  try {
    const consumer = kafka.consumer({ groupId: "user-group" });
    await consumer.connect();
    await consumer.subscribe({
      topics: ["add-user", 'delete-user'],
      fromBeginning: true,
    });
    console.log("post adding user");
    const userService = new UserService();
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        let user
        if (message.value) {
          user = JSON.parse(message.value.toString())
        }
        if (topic === "add-user") {
          await userService.createUser(user);
        }
      }
    })
  } catch (error) {
    console.log('kafka error')
    console.log(error);
  }
}
export default consume;


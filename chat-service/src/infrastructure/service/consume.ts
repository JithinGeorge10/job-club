
import kafka from '../config/kafkaConfig'
import { UserService } from '../../app/useCases/User/addUser'
import { CompanyService } from '../../app/useCases/Company/addCompany'
async function consume() {
    console.log('kafka consume')

    try {
        const consumer = kafka.consumer({ groupId: "chat-group" });
        await consumer.connect();
        await consumer.subscribe({
            topics: ["add-user", "add-company"],
            fromBeginning: true,
        });
        console.log("post adding user");
        const companyService = new CompanyService();
        const userService = new UserService();
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                let user
                if (message.value) {
                    user = JSON.parse(message.value.toString())
                    console.log(user)
                }

                if (topic === "add-user") {
                    await userService.createUser(user);
                }
                let company
                console.log('blaconsume');
                console.log(message.value);

                if (message.value) {
                    company = JSON.parse(message.value.toString())
                    console.log(company)
                }
                if (topic === "add-company") {
                    await companyService.createCompany(company);
                }
            }
        })
    } catch (error) {
        console.log('kafka error')
        console.log(error);
    }
}
export default consume;


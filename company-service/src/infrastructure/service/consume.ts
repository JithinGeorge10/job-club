
import kafka from '../config/kafkaConfig'
 import { CompanyService } from '../../app/useCases/addCompany/addCompany'
async function consume() {
  console.log('kafka consume')

  try {
    const consumer = kafka.consumer({ groupId: "company-group" });
    await consumer.connect();
    await consumer.subscribe({
      topics: ["add-company"],
      fromBeginning: true,
    });
    console.log("post adding company");
     const companyService = new CompanyService();
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
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


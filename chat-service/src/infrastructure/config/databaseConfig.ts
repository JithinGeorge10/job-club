
import mongoose from 'mongoose'
import { MONGO_URL } from '../../utils/config'

export const connectDB = async ()=>{
    try{
        await mongoose.connect(`${MONGO_URL}`)
    }catch(err){
        console.log(err)
    }
}

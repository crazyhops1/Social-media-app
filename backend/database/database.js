import mongoose from "mongoose";
const dbConnection=async()=>{
    try {
        const db = await mongoose.connect(process.env.DB)
        if(db){
            console.log('db connected')
        }
    } catch (error) {
        console.log(error)
        
    }

}
export default dbConnection

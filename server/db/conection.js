import mongoose from "mongoose";

const DB = async () =>{
    try {
       const conection= await mongoose.connect(`${process.env.MONGOOSE_URL}`)
        console.log(`MONGO DB IS CONNECTED ${conection.connection.host}`)
    } catch (error) {
        console.log("MONGOOSE DB CONECTION ERROR",error);
        process.exit(1)

    }
}
export default DB ;
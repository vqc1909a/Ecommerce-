import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            // useFindAndModify: false,
            // useCreateIndex: true,
            useUnifiedTopology: true,     
        })
        console.log(`DB Connected to ${db.connection.host}`.cyan.underline)  
    }catch(err){
        console.log(`Error: ${err.message}`.red.underline.bold);
        process.exit(1);
    }
}
export default connectDB
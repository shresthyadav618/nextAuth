import mongoose from "mongoose";

export async function connectDb(){
    try{
        mongoose.connect(process.env.MONGO_URL);
        const connection = mongoose.connection;
        
        connection.on('connected',()=>{
            console.log('Mongo db connected succesfully');
        });

        connection.on('error',(err)=>{
            console.log('Mongo db some error occured',err);
            process.exit();
        })
    }catch(error){
        console.log('Soemthing is wrong');
        console.log(error);
    }
}
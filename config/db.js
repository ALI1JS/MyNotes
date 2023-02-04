
const mongoose=require('mongoose');
mongoose.set('strictQuery',false);

const connectDB=async()=>{
    try {
        const connect=await mongoose.connect('mongodb://127.0.0.1:27017/Notes');
        console.log('the server connect to database ');
    } catch (error) {
        console.log(error);
    }
}

module.exports=connectDB;
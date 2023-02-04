
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

 const NoteSchema=new Schema({
    Owner:{
        type:Schema.Types.ObjectId
    },
    title:{
        type:String,
        required:true,
        trim: true
    },
    body:{
        type:String,
        required:true,
        trim: true
    },
    date:{
        type:String,
        default:Date(new Date)
    }
 })
 module.exports=mongoose.model('Notes',NoteSchema);
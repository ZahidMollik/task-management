const mongoose=require('mongoose');

const {Schema}=mongoose;

const taskSchema=Schema({
  title:{
    type:String,
    required:true
  },
  description:String,
  status:{
    type:String,
    enum:["pending","success","failed"],
    default:"pending"
  },
  userId:mongoose.Types.ObjectId
})

const Task=mongoose.model('Task',taskSchema);

module.exports=Task;
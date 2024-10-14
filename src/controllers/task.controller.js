const { StatusCodes } = require("http-status-codes");
const Task = require("../models/task.model");

async function createTask(req,res){
  try {
    const {title,description,status}=req.body;
    const validStatuses = ["pending", "success", "failed"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value. Must be one of: pending, success, failed.' });
    }
    const newTask= await Task.create({title,description,status,userId:req.user._id});
    res.status(StatusCodes.CREATED)
      .json({
        status:true,
        message:"Successfully task created",
        data:newTask
     })

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        status:false,
        message:"something went wrong",
     })
  }
  
}

module.exports={
  createTask
}
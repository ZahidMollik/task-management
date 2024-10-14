const { StatusCodes } = require("http-status-codes");
const Task = require("../models/task.model");

async function createTask(req,res){
  try {
    const {title,description,status}=req.body;
    const validStatuses = ["pending", "success", "failed"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value. Must be one of: pending, success, failed.' });
    } 
    const newTask= await Task.create({title,description,status,userId:req.user.id});
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

async function getAllTask(req,res){
  try {
    const response=await Task.find();
    res.status(StatusCodes.OK)
      .json({
        status:true,
        message:"Successfully get all tasks",
        data:response
     })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        status:false,
        message:"something went wrong",
     })
  }
}

async function getTask(req,res){
  try {
    const response=await Task.findOne({_id:req.params.id});
    if(!response){
      return res.status(StatusCodes.NOT_FOUND)
      .json({
        status:false,
        message:"no task found",
     })
    }
    res.status(StatusCodes.OK)
      .json({
        status:true,
        message:"Successfully get the data",
        data:response
     })
  } catch (error) {
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        status:false,
        message:"something went wrong",
     })
  }
}

async function updateTask(req,res){
  const {title,description,status}=req.body;
  try {
    const validStatuses = ["pending", "success", "failed"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value. Must be one of: pending, success, failed.' });
    } 
    const response=await Task.updateOne({_id:req.params.id},{title,description,status});
    if(!response){
      return res.status(StatusCodes.NOT_FOUND)
      .json({
        status:false,
        message:"no task found for update",
     })
    }
    res.status(StatusCodes.OK)
      .json({
        status:true,
        message:"Successfully update the data",
        data:response
     })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        status:false,
        message:"something went wrong",
     })
  }
}

async function deleteTask(req,res){
  try {
    const response=await Task.deleteOne({_id:req.params.id});
    if(!response){
      return res.status(StatusCodes.NOT_FOUND)
      .json({
        status:false,
        message:"no task found for delete",
     })
    }
    res.status(StatusCodes.OK)
      .json({
        status:true,
        message:"Successfully delete the task",
        data:response
     })
  } catch (error) {
    console.log(error);
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        status:false,
        message:"something went wrong",
     })
  }
}




module.exports={
  createTask,
  getAllTask,
  getTask,
  updateTask,
  deleteTask
}
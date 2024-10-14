const { StatusCodes } = require("http-status-codes");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const User = require("../models/user.model");
const { envConfig } = require("../config");

async function register(req,res){
  try {
    const {username,email,password}=req.body;
    const Email= await User.findOne({email:email});
    if(Email){
      return res.status(StatusCodes.BAD_REQUEST)
        .json({
          status:false,
          message:"This email already exists",
          data:""
        })
    }
    const hashpassword=await bcrypt.hash(password,10);
    const user=new User({username,email,password:hashpassword});
    await user.save();
    
    res.status(StatusCodes.CREATED)
      .json({
        status:true,
        message:"Successfully register",
        data:user
     })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          status:false,
          message:"something went wrong"
        })
  }
}

async function login(req,res){
  try {
    const {email,password}=req.body;
    const userByemail= await User.findOne({email:email});
    if(!userByemail){
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({
          status:false,
          message:"invalid credentials",
          
        })
    }
    const isMatchPassword=await bcrypt.compare(password,userByemail.password);
    if(!isMatchPassword){
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({
          status:false,
          message:"invalid credentials",
          
        })
    }
    const payload={
      id:userByemail._id,
      email:userByemail.email
    }
    const token=jwt.sign(payload,envConfig.SECRET_KEY,{expiresIn:'1d'});
    
    res.status(StatusCodes.CREATED)
      .json({
        status:true,
        message:"Successfully login",
        acesstoken:token
     })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          status:false,
          message:"something went wrong"
        })
  }
}

module.exports={
  register,
  login
}
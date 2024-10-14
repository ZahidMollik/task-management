const jwt =require('jsonwebtoken');
const { envConfig } = require('../config');
const { StatusCodes } = require('http-status-codes');
async function checkAuth(req,res,next){
  const token=req.headers.authorization?req.headers.authorization.split(' ')[1]:null;
  if(!token){
    return res.status(StatusCodes.BAD_REQUEST)
              .json({
                status:false,
                message:"Access denied"
              })
  }
  let decodeUser;
  try {
     decodeUser= await jwt.verify(token,envConfig.SECRET_KEY);

  } catch (error) {
    return res.status(StatusCodes.FORBIDDEN)
    .json({
      status:false,
      message:"Access denied"
    })
  }

  req.user=decodeUser;
  next();
}

module.exports=checkAuth;
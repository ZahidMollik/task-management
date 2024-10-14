const express=require('express');
const userRoute=require('./user.route');
const taskRoute=require('./task.route');
const router=express.Router();

router.use('/',userRoute);
router.use('/',taskRoute);

module.exports=router;
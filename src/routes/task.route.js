const express=require('express');
const { taskController } = require('../controllers');
const { checkAuth } = require('../middlewares');
const router=express.Router();

router.post('/task/create',checkAuth,taskController.createTask)


module.exports=router;
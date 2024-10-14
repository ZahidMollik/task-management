const express=require('express');
const { taskController } = require('../controllers');
const { checkAuth } = require('../middlewares');
const router=express.Router();

router.post('/task/create',checkAuth,taskController.createTask)
router.get('/task',checkAuth,taskController.getAllTask)
router.get('/task/:id',checkAuth,taskController.getTask)
router.patch('/task/:id',checkAuth,taskController.updateTask)
router.delete('/task/:id',checkAuth,taskController.deleteTask)


module.exports=router;
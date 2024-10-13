const express=require('express');
const {envConfig}=require('./config')
const app=express();
const PORT=envConfig.PORT;

app.listen(PORT,()=>{
  console.log(`Server running on PORT ${PORT}`)
})
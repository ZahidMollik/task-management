const express=require('express');
const mongoose=require('mongoose');
const {envConfig}=require('./config');
const apiRoute = require('./routes');
const app=express();

app.use(express.json());
app.use(apiRoute);

const PORT=envConfig.PORT;

async function connectDB(){
  try {
    await mongoose.connect(envConfig.MONGODB_URL);
    console.log("database connect successfully")
  } catch (error) {
    console.log("failed to connect database",error);
  }
  
}

connectDB();

app.listen(PORT,()=>{
  console.log(`Server running on PORT ${PORT}`)
})
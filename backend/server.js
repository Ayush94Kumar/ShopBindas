import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import dotenv from "dotenv";
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';

//App config
dotenv.config();
const app=express();
const port=process.env.PORT || 4000;


connectDB()
connectCloudinary()


//middlewares
app.use(express.json());
app.use(cors());

//Api endpoint
app.use('/api/user',userRouter);

app.get('/',(req,res)=>{
    res.send("Server stared !!");
})

app.listen(port,()=>console.log(`server is running on http://localhost:${port}`));
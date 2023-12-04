import express from "express";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();
dotenv.config();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true
}));



let temp = mongoose.connect(process.env.DB_URL)
    .then(console.log("connect"))
    .catch((e)=>console.log(e));


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use("/api/user",userRoute);
app.use("/api/product",productRoute);


app.listen(process.env.PORT || 5000,()=>{
    console.log("server is running");
});
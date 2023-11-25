import mongoose from "mongoose";
import {User} from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {UserProducts} from "../models/userProducts.js";

export const createNewUser = async (req,res,next)=>{
    const {email,name,password} = req.body;

    if(!email || !name || !password){
        res.json({success:false,message:"Fill all Details"});
        return;
    }

    const encryptedPass = await bcrypt.hash(password,10);
    try{
        const newUser = await User.create(
            {
                name,
                email,
                password : encryptedPass
            }
        )

        try{
            const userProduct = await UserProducts.create({
                userId : newUser._id,
                productIds : []
            })
        }catch(e){
            res.send(e);
        }
        

        res.json({success:true,message:"new user created"});
    }catch(e){
        res.send({success:false, message: "some error occured"});
        console.log(e);
    }
}

export const loginUser = async (req,res,next)=>{
    try{
       const {email,password} = req.body;
       let userData;
       try{
        userData = await User.findOne({email});
       }catch(e){
        console.log(e)
       }

       if(!userData){
            res.json({
                success : false,
                message : "wrong Credential"
            });
            return;
        }

        const passwordMatched = await bcrypt.compare(password, userData.password);
        if(!passwordMatched){
            res.json({
                success : false,
                message : "wrong Credential"
            });
            return;
        }

        const token = jwt.sign({_id : userData._id},process.env.JWT_SECRETE_KEY);

        res.status(201).cookie("token",token,{
            httpOnly:true,
            maxAge : 7*24*60*60*1000,
        }).json({
            success:true,
            message: `Welcome Back ${userData.name
            }`
        })
    }catch(e){
        res.send(e);
    }
}

export const getMe = async (req,res,next)=>{
    res.status(200).json({
        success : true,
        user: req.user,
    })
}

export const logoutUser = async (req,res,next)=>{
    try{  
        res.cookie("token","",{
            expires: new Date(0),
            httpOnly:true
        }).json({success:true, message:"Logout SucessFully"});
    }catch(e){
        res.send({success:false, message:"Logout Failed"});
    }
}
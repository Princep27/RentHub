import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated = async (req,res,next) => {
    const {token} = req.cookies;

    if(!token) 
    return res.json({
        sucess : false,
        message : "Login First",
    })

    const decode = jwt.verify(token,process.env.JWT_SECRETE_KEY);
    const data = await User.findById(decode._id);
    const {password,...other} = data._doc; 
    req.user = other;
    next();
}
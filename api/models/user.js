import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name :{
        type : String,
        require : true,
    },
    email:{
        type : String,
        unique : true,
        required : true
    },
    password:{
        type : String,
        require : true
    },
    contact:{
        type : Number
    },
},
{
    timestamps : true
}
);

export const User = mongoose.model("user",userSchema,"users");
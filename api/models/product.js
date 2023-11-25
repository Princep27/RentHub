import mongoose from "mongoose";

const proudctSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref :  "User"
    },
    categories : {
        type : [],
        default : undefined
    },
    title : {
        type: String,
        require : true,
    },
    description : {
        type: String,
    },
    rent : {
        price : {
            type : Number,
            require : true
        },
        duration : {
            type : String,   // like per month/ per year /per hour / per day .....
            required : true
        }
    },
    location : {
        state : {
            type : String,
            require : true,
        },
        city : {
            type : String,
            require : true,
        }
    },
    images : {
        type : [],
        require : true
    }
},
{timestamps : true}
);

export const Product = mongoose.model("Product",proudctSchema,"products");
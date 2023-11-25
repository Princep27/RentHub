import mongoose from "mongoose";

const userProductsSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId, 
        default: function() {
            return new mongoose.Types.ObjectId(this.userId);
        }
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },    
    productIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

export const UserProducts = mongoose.model("UserProducts",userProductsSchema,"usersProducts");
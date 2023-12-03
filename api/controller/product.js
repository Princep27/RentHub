import mongoose from "mongoose";
import { Product } from "../models/product.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import { UserProducts } from "../models/userProducts.js";

export const uploadNewProduct = async (req,res,next)=>{

    //uploading image in cloudnary and deleted tmp generated file
    try{
        const files = req.files.photos;
        let uploadedResults = [];
        if (!files.length) {
            // Upload a single file
            try{
                const uploadedResult = await cloudinary.uploader.upload(files.tempFilePath, { folder: 'uploads' });
                uploadedResults.push(uploadedResult);
            }catch(e){
                console.log(e);
            }
        
            fs.unlink(files.tempFilePath, (err) => {
              if (err) {
                console.error(`Error deleting temporary file: ${err}`);
              }
            });
        }
        else{
            uploadedResults = await Promise.all(files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.tempFilePath, { folder: 'uploads' });
            fs.unlink(file.tempFilePath, (err) => {
                if (err) {
                    console.error(`Error deleting temporary file: ${err}`);
                }
            });

            return result;
            }));
        }
        
        //extracting Link of all images
        const urlArray = [];
        uploadedResults.forEach(element => {
            urlArray.push(element.url);
        });
        //console.log(urlArray);

        //posting new Product data in mongoDB
        const {categories,title,description,rentPrice,rentDuration,locationState,locationCity} = req.body;
        const newProduct = await Product.create({
            userId : req.user._id,
            categories,
            title,
            description,
            images : urlArray,
            rent : {
                price : rentPrice,
                duration : rentDuration
            },
            location : {
                city : locationCity,
                state : locationState
            }
        })

        //Uploading product_id in usersProducts reation
        try{
            const newProductId = newProduct._id.toString();
            const userProduct = await UserProducts.findByIdAndUpdate(
                req.user._id,{$push: {productIds : newProductId}},{new : true}
            )
            //res.send(userProduct);
            res.json({"message" : "Product Added Sucessfull","success":true});
            //console.log(userProduct);
        }catch(e){
            res.send({"message" : "Something went Wrong","data" : e,"success":false});
        }

    }catch(e){
        res.send(e);
    }
}

export const deletePostDetail = async (req, res, next) => {
    const userId = req.user._id.toString();
    try {
        const publicIdsToDelete = []; 
        const productData = await Product.findById(req.params.productId);
        if(userId !== productData.userId.toString()){
            res.status(404).json({sucess:true, message: "You are allowed to delete only your Products"})
            return;
        }

        productData.images.forEach(image => {publicIdsToDelete.push("uploads/"+image.split('/')[8].split('.')[0])});
        for (const publicId of publicIdsToDelete) {
            try {
                const result = await cloudinary.uploader.destroy(publicId);
            } catch (error) {
                console.error(error);
            }
        }

        try{
            await Product.findByIdAndDelete(req.params.productId);
            await UserProducts.findByIdAndUpdate(
                userId,
                {$pull : {productIds : req.params.productId}},
                {new : true}
            )
        }catch(e){
            console(e);
        }
        
        res.json({'message':'Product deleted successfully','success':true});
    } catch (e) {
        res.status(500).send({'message' : 'Permission Denied'});
    }
}

export const getProductDetail = async (req,res,next) => {
    try{
        const product = await Product.findOne({_id : req.params.productId}); 
        res.send(product);
    }catch(e){
        res.send(e);
    }
}


export const getMyProducts = async (req,res,next) => {
    try{
        const data = await UserProducts.findById(req.user._id);
        const p_Ids = data.productIds;
        const products = [];
        for(const id of p_Ids){
            try{
                const data = await Product.findById(id);
                products.push(data);
            }catch(e){
                console.log(e);
            }
        }
        res.send(products);
    }catch(e){
        res.send(e);
    }
}

export const getFilteredProducts = async (req,res,next) => {
    let {search,state,city,orderby} = req.query;
    if(!orderby) orderby = -1; //desc
    else orderby = 1;  //asce
    console.log(search);

    if(!search && !state && !city){
        const data = await Product.find({},{},{sort : {'updatedAt':orderby}}).limit(20);
        res.send(data);
        return;
    }

    if(!search && !city && state){
        const data = await Product.find({"location.state" : state }).sort({updatedAt:-1});
        res.send(data);
        return;
    }

    if(!search && city && !state){
        const data = await Product.find({"location.city" : city }).sort({updatedAt:-1});
        res.send(data);
        return;
    }

    if(!search && city && state){
        const data = await Product.find({location:{state: state,city: city }}).sort({updatedAt:-1});
        res.send(data);
        return;
    }

    if(search && state && city){
        const data = await Product.find({
        $or:[
            { title: { $regex: search, $options: "i" } },
            { categories:  { $in: [new RegExp(search, 'i')] } }
        ]
        ,location:{state: state,city: city }}).sort({updatedAt:-1});
        res.send(data);
        return;
    }

    if(search && state && !city){
        const data = await Product.find({
        $or:[
            { title: { $regex: search, $options: "i" } },
            { categories:  { $in: [new RegExp(search, 'i')] } }
        ] ,"location.state":state}).sort({updatedAt:-1});
        res.send(data);
        return;
    }

    if(search && !state && !city){
        const data = await Product.find({$or:[
            { title: { $regex: search, $options: "i" } },
            { categories:  { $in: [new RegExp(search, 'i')] } }
          ]}).sort({updatedAt:-1});
        res.send(data);
        return;
    }
}

export const updateMyProduct = (req,res,next) => {
    res.send("need to implement update function")
}
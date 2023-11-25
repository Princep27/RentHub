import express from "express";
import { deletePostDetail, getFilteredProducts, getMyProducts, getProductDetail, updateMyProduct, uploadNewProduct } from "../controller/product.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post("/newProduct",isAuthenticated,uploadNewProduct);

//Return Products Posted by Login-User
router.get("/getMyProducts",isAuthenticated,getMyProducts);

//Return Products based on Search and Filters
router.get("/",getFilteredProducts);

//Return Targeted Product using Id
router.get("/:productId",getProductDetail);

router.delete("/:productId",isAuthenticated,deletePostDetail);

router.put("/:productId",isAuthenticated,updateMyProduct);

export default router;
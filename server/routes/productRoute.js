
import express from "express";
import { upload } from "../configs/multer.js";

import authUser from "../middlewares/authUser.js";
import authorize from "../middlewares/authorize.js";

import {
    addProduct,
    productList,
    productById,
    myProducts,
    updateProduct,
    deleteProduct,
    changeStock,
} from "../controllers/productController.js";

const productRouter = express.Router();

// =======================
// Consumer Routes
// =======================
productRouter.get("/list", productList);
productRouter.post("/id", productById);

// =======================
// Farmer Routes
// =======================
productRouter.post(
    "/add",
    authUser,
    authorize("farmer"),
    upload.array("images", 4),
    addProduct
);

productRouter.get(
    "/my-products",
    authUser,
    authorize("farmer"),
    myProducts
);


productRouter.put(
    "/update/:id",
    authUser,
    authorize("farmer"),
    updateProduct
);

productRouter.delete(
    "/delete/:id",
    authUser,
    authorize("farmer"),
    deleteProduct
);

productRouter.post(
    "/stock",
    authUser,
    authorize("farmer"),
    changeStock
);

export default productRouter;




// import express from 'express'
// import {upload} from '../configs/multer.js'
// import authSeller from '../middlewares/authSeller.js'
// import { addProduct, changeStock , productById ,productList} from '../controllers/productController.js';

// const productRouter = express.Router();


// productRouter.post('/add' , upload.array("images" , 4) ,authFarmer, addProduct)
// productRouter.get('/list' , productList)
// productRouter.get('/id' , productById)
// productRouter.post('/stock' , authSeller , changeStock)


// export default productRouter;
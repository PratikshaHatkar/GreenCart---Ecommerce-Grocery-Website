
import express from "express";

import {
    placeOrderCOD,
    placeOrderRazorpay,
    getUserOrders,
    getFarmerOrders,
    getAllOrders,
} from "../controllers/orderController.js";

import authUser from "../middlewares/authUser.js";
import authorize from "../middlewares/authorize.js";

const orderRouter = express.Router();

// =======================
// Consumer Routes
// =======================
orderRouter.post(
    "/cod",
    authUser,
    authorize("consumer"),
    placeOrderCOD
);

orderRouter.post(
    "/razorpay",
    authUser,
    authorize("consumer"),
    placeOrderRazorpay
);

orderRouter.get(
    "/user",
    authUser,
    authorize("consumer"),
    getUserOrders
);

// =======================
// Farmer Routes
// =======================
orderRouter.get(
    "/farmer",
    authUser,
    authorize("farmer"),
    getFarmerOrders
);

// =======================
// Admin Routes
// =======================
orderRouter.get(
    "/admin",
    authUser,
    authorize("admin"),
    getAllOrders
);

export default orderRouter;





// import express from 'express'
// import {placeOrderCOD , placeOrderRazorpay , getUserOrders , getAllOrders} from '../controllers/orderController.js'
// import authSeller from '../middlewares/authSeller.js'
// import authUser from '../middlewares/authUser.js'

// const orderRouter = express.Router();

// orderRouter.post("/cod" , authUser , placeOrderCOD)
// orderRouter.post("/razorpay" , authUser , placeOrderRazorpay)
// orderRouter.get("/user" , authUser , getUserOrders)
// orderRouter.get("/seller" , authSeller , getAllOrders)

// export default orderRouter;

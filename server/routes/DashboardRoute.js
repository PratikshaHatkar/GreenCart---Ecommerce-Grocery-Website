import {getFarmerDashboard} from "../controllers/DashboardController.js";
import express from "express"

import authUser from "../middlewares/authUser.js";
import authorize from "../middlewares/authorize.js";


const DashboardRouter = express.Router();

DashboardRouter.get(
    "/",
    authUser,
    authorize("farmer"),
    getFarmerDashboard
);
export default DashboardRouter;
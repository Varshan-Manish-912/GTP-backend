import express from "express";
import routerErrorHandler from "../middleware/GenericHandler/routerErrorHandler/routerErrorHandler.js";
import dashboardDetailController from "../controller/DashboardDetailController/dashboardDetailController.js";
import dashboardDetailHandler from "../middleware/DashboardDetailHandler/requestValidator.js";
const dashboardRouteHandler = express.Router();
try{
    dashboardRouteHandler.post("/user-profile/",dashboardDetailHandler.requestValidator,
        dashboardDetailController.dashboardDetailController);
}
catch(e){
    console.log(e);
    dashboardRouteHandler.use(routerErrorHandler.routerErrorHandler);
}
export default dashboardRouteHandler;
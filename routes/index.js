import express from "express";
import routerErrorHandler from "../middleware/GenericHandler/routerErrorHandler/routerErrorHandler.js";
import indexHandler from "../middleware/GenericHandler/IndexHandler/indexHandler.js";
import authRouteHandler from "./authRoutes.js";
import p2pRouteHandler from "./p2pRoutes.js"
import dashboardRouteHandler from "./dashboardRoutes.js"
const routeHandler = express.Router();
try{
    routeHandler.get("/",indexHandler.indexHandler);
    routeHandler.use("/auth/",authRouteHandler);
    routeHandler.use("/p2p-marketplace/",p2pRouteHandler);
    routeHandler.use("/dashboard/",dashboardRouteHandler);
}catch(e){
    console.log("Router Error");
    console.log(e);
    routeHandler.use(routerErrorHandler.routerErrorHandler);
}
export default routeHandler;
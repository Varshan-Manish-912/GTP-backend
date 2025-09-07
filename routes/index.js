import express from "express";
import routerErrorHandler from "../middleware/GenericHandler/routerErrorHandler/routerErrorHandler.js";
import indexHandler from "../middleware/GenericHandler/IndexHandler/indexHandler.js";
import authRouteHandler from "./authRoutes.js";
const routeHandler = express.Router();
try{
    routeHandler.get("/",indexHandler.indexHandler);
    routeHandler.use("/auth/",authRouteHandler);
}catch(e){
    console.log("Router Error");
    console.log(e);
    routeHandler.use(routerErrorHandler.routerErrorHandler);
}
export default routeHandler;
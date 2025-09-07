import routerErrorHandler from "../middleware/GenericHandler/routerErrorHandler/routerErrorHandler.js";
import tokenEntryHandler from "../middleware/P2PMarketplaceHandler/TokenEntryHandler/requestValidator.js";
import tokenExitHandler from "../middleware/P2PMarketplaceHandler/TokenExitHandler/requestValidator.js";
import addTokenController from "../controller/P2PMarketplaceController/AddTokenController.js";
import returnTokenController from "../controller/P2PMarketplaceController/ReturnTokenController.js";
import removeTokenController from "../controller/P2PMarketplaceController/RemoveTokenController.js";
import express from "express";
const p2pRouteHandler = express.Router();
try{
    p2pRouteHandler.post("/add-token/",
        tokenEntryHandler.requestValidator,addTokenController.addTokenController);
    p2pRouteHandler.get("/get-tokens/",returnTokenController.returnTokenController);
    p2pRouteHandler.post("/remove-token",tokenExitHandler.requestValidator,
        removeTokenController.removeTokenController );
}
catch(e){
    console.log(e);
    p2pRouteHandler.use(routerErrorHandler.routerErrorHandler);
}
export default p2pRouteHandler;
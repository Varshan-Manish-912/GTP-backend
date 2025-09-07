function routerErrorHandler(request,response){
    response.status(500).json({responseMessage:"Server Router Error"});
}
export default {routerErrorHandler};
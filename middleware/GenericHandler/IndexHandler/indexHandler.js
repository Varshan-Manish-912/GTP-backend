function indexHandler(request,response){
    response.status(200).json({responseMessage:"Server Running Correctly"});
}
export default {indexHandler};
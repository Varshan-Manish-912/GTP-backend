function dashboardDetailController(request, response){
    try{
        const {username, email, walletAddress, role} = request.userProfile;
        response.status(200).json({username,email,walletAddress,role})
    }
    catch(e){
        response.status(500).json({responseMessage:
                "Internal Server Error Occurred In Dashboard Detail Controller"});
    }
}
export default {dashboardDetailController};
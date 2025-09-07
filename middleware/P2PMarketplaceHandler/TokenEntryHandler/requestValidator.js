function requestValidator(request, response, next){
    try{
        const {tokenID, CID} = request.body;
        if(tokenID && CID){
            const CIDRegex = /^b[a-z2-7]{50,}$/;
            if(CIDRegex.test(CID)){
                const metadataURI = "https://ipfs.io/ipfs/"+CID;
                request.metadataURI = metadataURI;
                next();
            }
            else{
                response.status(400).json({responseMessage:"Invalid CID"});
            }
        }
        else{
            response.status(400).json({responseMessage:
                    "Invalid Request Payload: Missing tokenID or CID"});
        }
    }
    catch(e){
        console.log(e);
        response.status(500).json({responseMessage:
                "Internal Server Error: Token Entry Request Validation Failed"});
    }
}
export default {requestValidator}
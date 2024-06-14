const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        console.log(token);
        const verify=jwt.verify(token,'e-comm')
        next()
    }
    catch(err){
        res.status(401).json({
            msg:" invalid token"
        })
    }

}


// in case of admin 
 /* module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        console.log(token)
        const verify=jwt.verify(token,'e-comm')
        console.log(verify)
        if( verify.userType == 'admin'){
            next()
        }
        else{
            return res.status(401).json({
                msg:" not admin"
            })
        }
    }
    catch(error){
        res.status(401).json({
            msg:"invalid token"
        })
    }
}
*/
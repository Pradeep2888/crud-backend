const jwt = require("jsonwebtoken");

const authentication=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(!token){
        res.send("please login")
    }
    console.log(token)
    const decoded = jwt.verify(token,"ABCD12345XYZ");
     if(decoded.user_detail.user_type==="admin"){
         next()
     }
     else{
       res.send("You are not authorised user")
     }
}

module.exports={authentication}
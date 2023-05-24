const express = require("express");
const { UserModel } = require("../models/UserModel");
const loginRouter=express.Router()
const jwt=require("jsonwebtoken")


loginRouter.get("/",(req,res)=>{
    res("welcome to login page")
})



loginRouter.post("/user",async (req,res)=>{
    const {email,password}=req.body
    const user= await UserModel.findOne({email})
    const user_detail={
        user_id:user._id,
        user_type:user.user_type
    }
  
        if(password!==user.password){
            res.send({"msg":"password incorrect"})
        }
        else if(password===user.password){
            const token=jwt.sign({user_detail},"ABCD12345XYZ");
            res.send({"mesg":"Login sucessfull","token":token})
        }
        else{
            res.send({"msg":"Login faild"})
        }
 
})









module.exports={loginRouter}
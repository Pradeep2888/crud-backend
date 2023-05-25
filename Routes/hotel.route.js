const express=require("express")
const { HotelModel } = require("../models/HotelModel")
const { authentication } = require("../middlewares/authentication")
const hotelRouter=express.Router()


hotelRouter.get("/",async(req,res)=>{
   
    const data=await HotelModel.find()
    res.send({"hotel":data})
})

hotelRouter.post("/add",authentication,async(req,res)=>{
    let {name,owner_name,address,mobile,rating}=req.body
    const isHotel = await HotelModel.findOne({name})

    if(isHotel){
        res.send({"msg" : "Hotel already exists"})
    }
    else {
        const new_hotel=new HotelModel({
            name,
            owner_name,
            address,
            mobile,
            rating
        })
        try{
            await new_hotel.save()
            res.send({"msg" : "Hotel added successfully"})
        }
        catch(err){
            console.log(err)
            res.send({"msg" : "Something went wrong please try again"})
        }
}
})


hotelRouter.delete("/delete/:id",authentication,async(req,res)=>{
  
    const {id}=req.params
  
    const data=await HotelModel.findOne({_id:id})
    if(data){
        await HotelModel.deleteOne({_id:id})
        res.send({"msg":"hotel is deleted"})
    }
    else{
        res.send({"msg":"hotel not exist more"})   
    }
   
})

hotelRouter.patch("/update/:id",authentication,async(req,res)=>{
       const {id}=req.params
       const {name,owner_name,address,mobile,rating}=req.body
   
        
        try{
            const updated= await HotelModel.findByIdAndUpdate({_id:id},{"$set":{"name":name,"owner_name":owner_name,"address":address,"mobile":mobile,"rating":rating}})
            res.send("update successfully")
         }
         catch(err){
             console.log(err)
             res.send("update not successfully")
         }

       

})


module.exports=(hotelRouter)
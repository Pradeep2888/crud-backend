const express=require("express")
const { RoomModel } = require("../models/RoomModel")
const { BookingModel } = require("../models/BookingModel")
const bookingRouter=express.Router()


bookingRouter.get("/mybooking/:user_id",async(req,res)=>{
     const {user_id}=req.params
    const data=await BookingModel.find({user_id})
    res.send({"data":data}) 
})

bookingRouter.post("/roombook",async(req,res)=>{
     const {hotel_id,room_id,user_id,no_of_rooms_booked,date}=req.body
    const roomdata=await RoomModel.findOne({"_id":room_id})
    if(!roomdata){
        res.send({"msg":"Room information avilable"})
    }
    else if(roomdata.no_of_avilable===0){
        res.send({"msg":"Room not avilable"})
    }
    else if(roomdata.date!==date){
        res.send({"msg":"Room not avilable on particular date"})
    }
   else{
    const new_booking=new BookingModel({
       hotel_id,
       room_id,
       user_id,
       no_of_rooms_booked,
       date
    })
   
    try{
        await new_booking.save()
         await RoomModel.findByIdAndUpdate({_id:roomdata._id},{"$set":{"no_of_avilable":(roomdata.no_of_avilable)-Number(no_of_rooms_booked)}})
        res.send({"msg" : "room booked successfully"})
    }
    catch(err){
        console.log(err)
        res.send({"msg" : "Something went wrong please try again"})
    }


   }

})

bookingRouter.delete("/delete/:bookingid",async(req,res)=>{
    const {bookingid}=req.params

    const data=await BookingModel.findOne({_id:bookingid})
  
    if(!data){
        res.send({"msg":"room booking not exist more"}) 
    }
    else if(data){
        const roomdata=await RoomModel.findOne({"_id":data.room_id})
        await  BookingModel.deleteOne({_id:bookingid})
        await RoomModel.findByIdAndUpdate({_id:roomdata._id},{"$set":{"no_of_avilable":(roomdata.no_of_avilable)+Number(data.no_of_rooms_booked)}})
        res.send({"msg":"room booking is deleted"})
    }
    else{
        res.send({"msg":"room booking not exist more"})  
    }

})




module.exports={bookingRouter}
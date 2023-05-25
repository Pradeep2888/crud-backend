const express=require("express")

const { authentication } = require("../middlewares/authentication")
const { RoomModel } = require("../models/RoomModel")
const roomRouter=express.Router()

roomRouter.get("/",async(req,res)=>{
    const data=await RoomModel.find()
    res.send({"room":data})
})

roomRouter.post("/add/:hotel_id",async(req,res)=>{
    const {hotel_id}=req.params
    let {room_type,no_of_rooms,no_of_avilable, price,date}=req.body
    const isRoom = await RoomModel.findOne({room_type,date})

    if(isRoom){
        res.send({"msg" : "room information already exists for perticular date"})
    }
    else {
        const new_room=new RoomModel({
            hotel_id,
            room_type,
            no_of_avilable,
            no_of_rooms,
            price,
            date
        })
        try{
            await new_room.save()
            res.send({"msg" : "room added successfully"})
        }
        catch(err){
            console.log(err)
            res.send({"msg" : "Something went wrong please try again"})
        }
}
})


roomRouter.delete("/delete/:roomid",async(req,res)=>{
  
    const {roomid}=req.params
  
    const data=await RoomModel.findOne({_id:roomid})
    if(data){
        await RoomModel.deleteOne({_id:id})
        res.send({"msg":"room is deleted"})
    }
    else{
        res.send({"msg":"room not exist more"})   
    }
   
})


roomRouter.patch("/update/:roomid",async(req,res)=>{
    const {roomid}=req.params
    const {room_type,no_of_avilable,no_of_rooms,price,date}=req.body

     
     try{
         const updated= await RoomModel.findByIdAndUpdate({_id:roomid},{"$set":{"room_type":room_type,"no_of_avilable":no_of_avilable,"no_of_rooms":no_of_rooms,"price":price,"date":date}})
         res.send("room update successfully")
      }
      catch(err){
          console.log(err)
          res.send("room update not successfully")
      }

    

})


module.exports=(roomRouter)
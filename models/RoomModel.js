const mongoose = require("mongoose")

const roomSchema=new mongoose.Schema({
    hotel_id:{type:String,required:true},
    room_type:{type:String,required:true},
    no_of_rooms:{type:Number,required:true},
    no_of_avilable:{type:Number,required:true},
    price:{type:Number,required:true},
    date:{type:String,required:true},
})

const RoomModel=mongoose.model("room",roomSchema)


module.exports={RoomModel}
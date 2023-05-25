const mongoose = require("mongoose")

const bookingSchema=new mongoose.Schema({
    hotel_id:{type:String,required:true},
    room_id:{type:String,required:true},
    user_id:{type:String,required:true},
    no_of_rooms_booked:{type:Number,required:true},
    date:{type:String,required:true},
})

const BookingModel=mongoose.model("booking",bookingSchema)


module.exports={BookingModel}
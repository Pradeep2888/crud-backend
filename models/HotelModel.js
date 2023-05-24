const mongoose = require("mongoose")

const hotelSchema=new mongoose.Schema({
    name:{type:String,required:true},
    owner_name:{type:String,required:true},
    address:{type:String,required:true},
    mobile:{type:Number,required:true},
    rating:{type:Number,required:true},
})

const HotelModel=mongoose.model("hotel",hotelSchema)


module.exports={HotelModel}
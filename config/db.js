const mongoose=require("mongoose")

const connection=mongoose.connect("mongodb+srv://pradeep:pradeep@cluster0.hyijip3.mongodb.net/groovy?retryWrites=true&w=majority")

module.exports={connection}
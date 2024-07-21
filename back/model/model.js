const mongoose=require("mongoose")
const ITEMS=mongoose.model("ITEMS",new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    image:String
}) )
module.exports={ITEMS}
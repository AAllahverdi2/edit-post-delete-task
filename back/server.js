const express=require("express")
const app=express()
const itemRouter=require("./router/router")
const cors=require("cors")
const mongoose=require("mongoose")
require('dotenv').config()
app.use(cors())
const PORT=process.env.PORT || 5670
app.use(express.json())
mongoose.connect("mongodb+srv://tu7ljr8ww:Allahverdi123@cluster0.hlwgpfm.mongodb.net/").then(res=>{
    console.log("connected to mongodb")
})
app.use("/items",itemRouter)
app.listen(PORT,()=>{
    console.log("connected to back")
})

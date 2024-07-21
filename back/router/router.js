const express=require("express")
const router=express.Router()
const {ITEMSController}=require("../controller/controller")
router.get("/",ITEMSController.getAll)
router.get("/:id",ITEMSController.getById)
router.post("/",ITEMSController.Post)
router.delete("/:id",ITEMSController.delete)
router.put("/:id",ITEMSController.edit)
module.exports=router
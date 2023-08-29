const contact =require("../models/contactModel")


exports.contactcontroller=async(req,res)=>{
    try{
const {email , phnumber, description}=req.body;
const contact1=new contact({email , phnumber, description})
await contact1.save();
res.render("contact")
    }catch(error){
        res.send(error)      
    }
}
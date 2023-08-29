const express= require('express')
const jwt=require("jsonwebtoken")
const auth=require("../middleware/auth")



//router object
const router=express.Router()

const contactController = require('../controller/contactController');

//login rout
router.get('/contact',auth,(req, res)=>{
    res.render("contact")
  });

  router.post('/contact', contactController.contactcontroller);
  
  module.exports=router;
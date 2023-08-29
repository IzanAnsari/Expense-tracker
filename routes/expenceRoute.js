const express= require('express')

//router object
const router=express.Router()
const auth=require("../middleware/auth")

const expenceController = require('../controller/expenceController');

router.post('/addexpence',auth, expenceController.createexpence);
router.get('/addexpence', auth,expenceController.getexpences);
router.delete('/addexpence/:id', auth, expenceController.deleteexpence);
  
module.exports=router;

  
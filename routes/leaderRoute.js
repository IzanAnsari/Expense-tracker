
const express= require('express')

//router object
const router=express.Router();

const leaderController = require('../controller/leaderController');

const auth=require("../middleware/auth")

router.get('/leader',auth,(req,res)=>{
    res.render('leader')
   })

router.post('/addexpence1',auth, leaderController.createexpence);
router.get('/addexpence1', auth,leaderController.getexpences);
router.delete('/addexpence1/:id', auth, leaderController.deleteexpence);
router.get('/addexpence1/leaderboard', auth, leaderController.getexpencesandleaderboard);
  

module.exports=router;


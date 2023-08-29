const express= require('express')

//router object
const router=express.Router()

//signup requiring controller
const {loginController, signupController, forgotController, resetpassController}=require("../controller/userController")

//requiring auth middleware
const auth=require("../middleware/auth")

//frontpagerout
router.get('/', (req, res)=>{
    res.render("frontpage")
  });

//login rout
router.get('/login', (req, res)=>{
  res.render("login")
});

router.post('/login', loginController)


//signup route
router.get('/signup', (req, res)=>{
    res.render("signup")
  });
router.post('/signup', signupController)

//rout or forgot paasss
router.get('/forgot',(req,res)=>{
    res.render("forgot")
  })
router.post('/forgot',forgotController)  

  //rout for reset pass after email werification
router.get('/reset', (req, res)=>{
  res.render("reset")
})
router.post('/reset', resetpassController)

//home page rout
router.get('/homepage',auth,(req, res)=>{
  res.render("homepage")
});



//error rout
router.get('/error', (req, res)=>{
    res.render("error")
  });



router.get('/about',auth, (req, res)=>{
  res.render("about")
});


//logout funtion
router.get('/logout' ,auth,async(req,res)=>{
  try{
  //remove from db one user token or single out
  //req.user.tokens=req.user.tokens.filter((currenttoken)=>{
      // return currenttoken.token !== req.token;
  //})

  //logout from all devices
 req.user.tokens=[]; 

  //clear cookies
   res.clearCookie("jwt")
    await req.user.save(); 
    res.render("login")
  }catch{
    res.send("your not a logged-in")
  }
})

module.exports=router;
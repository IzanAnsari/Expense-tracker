const User = require('../models/userModel');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const nodemailer=require("nodemailer")
const randomstring=require("randomstring")

const sendresetpasswordmail = async(name,email,token)=>{
  try{
     const transpoter = nodemailer.createTransport({
       service:"gmail",
        auth:{
          user:process.env.emailuser,
          pass:process.env.emailpassword,
        }
       });

       const mailoption={
        from:process.env.emailuser,
        to:email,
        subject:'For Reset Password',
        html:`<p>Hii '+name+' please copy the link <a href="http://localhost:3000/reset?token=${token}"> TO RESET PASSWORD</a></p>`,
       }
       transpoter.sendMail(mailoption,function(error,info){
          if(error){
            console.log('Error in sending mail')
          }
          else{
            console.log("mail has been sent:-",info.response);
          }
       });
  }catch (error) {
    res.status(400).send({success:false,msg:error.message});
    
  }
}

//signup rout controller fn
const signupController = async (req, res) => {
  try {
    const { name, email,phnumber, password } = req.body;
    const user = new User({ name, email, phnumber,password }) 
    const token = await user.generateauthToken();
    res.cookie("jwt", token,{
      expires:new Date(Date.now()+604800000),
      httpOnly:true,
      //secure:true,
    });
    await user.save();
    res.render('login');
  } catch (error) {
    res.render("errors");
    
   
  }
};

// login route controller fn
const loginController=async(req,res)=>{
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password)
     const token=await user.generateauthToken();
    res.cookie("jwt", token,{
      expires:new Date(Date.now()+604800000),
      httpOnly:true, 
      //secure:true,
     }); 
     if (isMatch) {
      if (user.ispro) {
        res.redirect('/leader'); // Redirect to the leader page if the user is a pro
      } else {
        res.redirect('/homepage'); // Redirect to the homepage if the user is not a pro
      }
    } else {
      res.render("error");
    }
  } catch (error) {
    res.render("error");
  }
};


//creat method for forgot password nodemailer....................................................................................................




//controller for forgot pass
/* const forgotController=async(req,res)=>{
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.send("Invalid email");
    }

    const token = randomstring.generate();
    User.token = token;
    await user.save();

    // Call the sendResetPasswordMail function
    await sendresetpasswordmail(user.email, token);

    res.send("Please check your email inbox and reset your password! IF not Cheak Spam ");
  }catch (error){
   res.send("this is forgotcontroller error")
} 
}

const resetpassController=async (req,res)=>{
  try {
    const token = req.query.token;
    console.log("token====",token)
    const newPassword = req.body.password;

    const user = await User.findOne({ token: token });
    console.log("user",user)
    if (!user) {

      return res.send('This link has expired');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the token field using findByIdAndUpdate
    await User.findByIdAndUpdate(
      user._id,
      { password: hashedPassword, token: '' },
      { new: true }
    );

    res.send('Password reset successfully');
   
   
  }catch(error){
  res.send('this is catch reset error from reset block')
}
} */


const forgotController = async (req,res)=>{
  try{
    const email = req.body.email;
   const user = await User.findOne({email:email});
      if(user){
           const randomString = randomstring.generate();
           const data = await User.updateOne({email:email},{$set:{token:randomString}});

           await sendresetpasswordmail(user.name, user.email, randomString);

           res.status(200).send({success:true,msg:"please cheack your email and reset your password."});
      }else{
        res.status(200).send({success:true,msg:"this email does not exists."});
      }
  }catch(error){
    res.status(400).send({success:false,msg:error.message});


  }
}

//for reset the password

const resetpassController = async (req,res)=> {
  try {
    const token = req.query.token;
    const tokendata = await User.findOne({ token:token});
    if(tokendata){
       const password = req.body.password;
       const newPassword = await bcrypt.hash(password, 10);
      console.log('Hashed new password:', newPassword);
        const user =  await User.findByIdAndUpdate({_id:tokendata._id }, {$set:{password:newPassword,token: ''}},{new:true});
        res.status(200).send({success:true,msg:"User password has been reset",data:user});

    }
    else{
      res.status(200).send({success:true,msg:"this link has been expired"});

    }

  } catch (error) {
    res.status(400).send({success:false,msg:error.message});
    
  }
}


module.exports={loginController, signupController,forgotController,resetpassController}
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel")


const auth = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        const user = await userModel.findOne({_id:verifyUser._id, })     
          //logout auth part
          req.token=token;
          req.user=user;  
                
        next();
        }catch(error){
            res.render("error");                    
        }
}
module.exports=auth;


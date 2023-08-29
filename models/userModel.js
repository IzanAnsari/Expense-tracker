const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const jwt=require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phnumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  //for Membership
  ispro:{
    type:Boolean,
    default:false,
    required:true,
  },

//token field
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }]
});

//generating the tokens
userSchema.methods.generateauthToken = async function () {
  try {
    const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token:token})
    await this.save();
    return token;
  }catch(error){
   
  }
  }

//hashing password
userSchema.pre("save", async function (next){
  if (this.isModified('password')){
    this.password= await bcrypt.hash(this.password , 10);
  }
  next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;

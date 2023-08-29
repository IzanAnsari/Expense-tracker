const expence= require('../models/expenceModel');
const User=require('../models/userModel')
const dotenv=require('dotenv')

//to load.env files
dotenv.config()



exports.createexpence=async(req,res)=>{
    try{
        const userId = req.user.id;
const {amount , description}=req.body;
const expence1=new expence({amount , description,userId});
await expence1.save();
res.redirect('leader');
}catch(error){
res.send(error)
//console.log(error)
    }
}

// Get all expenses
exports.getexpences = async (req, res) => {
    try {
      const userId = req.user.id;
      //const expences = await expence.find();
      const expences = await expence.find({ userId });
      res.json(expences);
    } catch (error) {
      res.render('error')
    }
  };
  
  // Delete an expense
  exports.deleteexpence = async (req, res) => {
      try {
        const expenceId = req.params.id;
        const deletedexpence = await expence.findByIdAndDelete(expenceId);
        if (!deletedexpence) {
          return res.status(404).json({ error: 'Expense not found.' });
        }
        res.render('leader')
      } catch (error) {
        console.log(error);
    
      }
    };
    


// controller.js
 exports.getexpencesandleaderboard = async (req, res) => {
    try {
      const expences = await expence.find();
  
      const leaderboardData = {};
      expences.forEach(expence => {
        const user = expence.userId;
        if (leaderboardData[user]) {
          leaderboardData[user] += expence.amount;
        } else {
          leaderboardData[user] = expence.amount;
        }
      });
  
      const users = await User.find();
  
      const leaderboard = [];
      users.forEach(user => {
        const totalamount = leaderboardData[user._id.toString()] || 0;
        leaderboard.push({ user: user.name, totalamount: totalamount });
      });
  
      leaderboard.sort((a, b) => b.totalamount - a.totalamount);
  
      res.json({expences,leaderboard });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  
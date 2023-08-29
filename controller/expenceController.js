const expence= require('../models/expenceModel');



exports.createexpence=async(req,res)=>{
    try{
        const userId = req.user.id;
const {amount , description}=req.body;
const expence1=new expence({amount , description,userId});
await expence1.save();
res.redirect('/homepage');
}catch(error){
res.send(error)
console.log(error)
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
        res.render('homepage')
      } catch (error) {
        console.log(error);
    
      }
    };
    
  
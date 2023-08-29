const dotenv=require('dotenv')
const membership=require('../models/membershipModel')
const signup=require('../models/userModel')
const Razorpay = require('razorpay');

//to load.env files
dotenv.config()


// Create a new instance of Razorpay with your API key and secret
const razorpay = new Razorpay({
  key_id:process.env.rzp_key_id,
  key_secret:process.env.rzp_key_secret
});


// Controller function to create a new order
exports.createOrder = async (req, res) => {
  try {
   const { amount, currency } = req.body;
    const userId = req.user.id;
    // Create the order using the Razorpay API
    const order = await razorpay.orders.create({
      amount, // Amount in the smallest currency unit (e.g., paise in India)
      currency,
      receipt: 'order_receipt', // Unique identifier for the order receipt
      payment_capture: 1, // Automatically capture the payment
    });



// Store the payment details in MongoDB
const membership1 = new membership ({
  orderId: order.id,
  amount: order.amount,
  currency: order.currency,
  userId:userId,
  paymentId: '',
});
  

 await membership1.save();
 

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Controller function to save membership and update isPro field
exports.saveMembership = async (req, res) => {
  try {
    const { orderId, paymentId, userId } = req.body;
    // Find the membership using the orderId
    const membership1 = await membership.findOne({ orderId });
    if (!membership1) {
      return res.status(404).json({ error: 'Membership not found' });
    }
    // Update the membership with paymentId
    membership1.paymentId = paymentId;
    await membership1.save();

    // Find the user using userId and update isPro field
    const user = await signup.findById(membership1.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.ispro = true;
    await user.save();

    res.json({ message: 'Membership saved and isPro field updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save membership and update isPro field' });
  }
};




const express =require('express')
const path=require('path');
const bodyparser=require('body-parser')
const dotenv=require('dotenv')
const port= 3000 || process.env.port
const app=express()
const cookieParser = require('cookie-parser');

dotenv.config()
//view engine
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// export db
require("./server/db");

//require routes--userout
const UserRouter=require("./routes/userRoute")

//require routes--contact
const ContactRouter=require("./routes/contactRoute")


//require routes--expence
const expenceRouter=require("./routes/expenceRoute")


//memership razor route
const membershiprouter = require('./routes/membershipRoute');

//leader route
const leaderrouter = require('./routes/leaderRoute');






//export schemas
const signup=require("./models/userModel");
const expence=require("./models/expenceModel");
const contact=require("./models/contactModel");



app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(cookieParser())
app.use(bodyparser.json({extended:false}))

//rout for user
app.use(UserRouter);

//rout for contact
app.use(ContactRouter);

//rout for expence
app.use(expenceRouter);

//rout for leaderboard
app.use(leaderrouter);

//rout for membership
app.use(membershiprouter);

app.listen(port,()=>{
    console.log("server started")
})
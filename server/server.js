const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const app = express();
const mongoose = require("mongoose");
require("dotenv").config();   //dotenv grabs the DATABASE and mkaes it available to use it right here


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true }); 


//================================================
//Register middleware to use bodyParser and cookieParser
//================================================
app.use(bodyParser.urlencoded({extended:true}));    //use  url query string
app.use(bodyParser.json())           //we use json so that when ever we get request we will be able to read it
app.use(cookieParser())


// MODELS
const { User } = require('./models/user') //to store anything we can make a reference to this  { User}

//========================================
//           USERS
//========================================

app.post('/api/users/register', (req,res) =>{
    const user = new User(req.body);

    user.save((err,doc) =>{
        if(err) return res.json({success:false, err})
        res.status(200).json({
            success:true,
            userdata:doc
        })
    })
})





const port = process.env.PORT || 3002;

app.listen(port, () =>{
     console.log(`Server is running  at ${port}`)
})
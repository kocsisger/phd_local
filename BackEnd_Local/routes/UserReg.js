if(process.env.NODE_ENV !== 'production'){ //ha a környezet nem lenne töltenne be
    require('dotenv').config()
}

const Users = require('../models/Users');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var generator = require('generate-password');
const mongoose = require('mongoose');
const SendEmail = require('./EmailSender'); 
const db = mongoose.connection;


function ChangeUserName(Username){
    var username = Username + '' + generator.generate({
        length: 1,
        numbers: true
});
    return username;
}

router.post('/', async (req,res)=>{
    try{
    const pass = generator.generate({
            length: 10,
            numbers: true
    });
    const username = req.body.email.split('@');
    const hashedPass = await bcrypt.hash(pass,10)

    const User = new Users ({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        neptuncode:req.body.neptuncode,
        supervisor:req.body.supervisor,
	supervisorID:req.body.supervisorID,
        doctoralprogram:req.body.doctoralprogram,
        coursetype:req.body.coursetype,
        semester:req.body.semester,
        programdirector:req.body.programdirector,
        username:username[0],
        pass:hashedPass,
    });

  await User.save(function(err) {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        User.username = ChangeUserName(User.username);
      }
      else{
      res.json({message:err});
      }
      User.save(function(err) {
        if (err) {
            res.send("Failed to register due to username generation please try again!")
        }
        else{
            const output = `
            <p>You have successfully registered to the Doctoral School!</p>
            <h3>Your Login information:</h3>
             <ul>  
                <li>Username: ${User.username}</li>
               <li>Password: ${pass}</li>
             </ul>
            <h3>You can login at: http://localhost:3000/userlogin.</h3>`;
            const subject = 'Registration data';
            SendEmail(output,req.body.email,subject);
            res.send("Succes User registration!");
        }
      });
    }
    else{
        const output = `
        <p>You have successfully registered to the Doctoral School!</p>
        <h3>Your Login information:</h3>
         <ul>  
            <li>Username: ${username[0]}</li>
           <li>Password: ${pass}</li>
         </ul>
        <h3>You can login at: http://localhost:3000/userlogin.</h3>`;
        const subject = 'Registration data';
        SendEmail(output,req.body.email,subject);
        res.send("Succes User registration!")
    }
  });
    }catch(err){
        res.json({message:err});
    }    
});

module.exports=router;

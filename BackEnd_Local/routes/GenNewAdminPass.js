if(process.env.NODE_ENV !== 'production'){ //ha a környezet nem lenne töltenne be
    require('dotenv').config()
}

const express = require('express');
const router = express.Router();
var generator = require('generate-password');
const bcrypt = require('bcrypt');
const SendEmail = require('./EmailSender'); 
const mongoose = require('mongoose');
const db = mongoose.connection;


router.post('/', async (req,res)=>{
    const pass = generator.generate({
        length: 10,
        numbers: true
    });
    const hashedPass = await bcrypt.hash(pass,10)
    try{
    var waitforgetTeacherbyID = new Promise((resolve, reject) => {
        const cursor = db.collection('admins').find({_id : mongoose.Types.ObjectId(req.body.GenerateAdminID)});
          cursor.each(function(err, doc) {
                resolve(doc)})  
          });

          waitforgetTeacherbyID.then((User) => {
            try {
            var myquery = { _id: User._id};
                    var newvalues = { $set: {pass:hashedPass} };

                       db.collection("admins").updateOne(myquery, newvalues, function(err, res) {
                           if (err) throw err;
                       });
                       const output = `
                       <p>Your password has changed!</p>
                       <h3>Your username:</h3> 
                          <ul>
                            <li>${User.username}</li>
                          </ul>
                       <h3>Your new pass:</h3>
                        <ul>  
                          <li>${pass}</li>
                        </ul>
                       <h3>You can login at: http://phd.inf.unideb.hu/adminlogin.</h3>`;
                       const subject = 'New admin password for Doctoral School!';
                       SendEmail(output,User.email,subject);
                       res.send("Successfully Change Pass!")
               } catch (e) {
                    res.json({message:e});
            }})

    }catch(err){
        res.json({message:err});
    }    
});


module.exports=router;


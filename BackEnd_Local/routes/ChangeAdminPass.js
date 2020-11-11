if(process.env.NODE_ENV !== 'production'){ //ha a környezet nem lenne töltenne be
    require('dotenv').config()
}

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const db = mongoose.connection;

router.post('/', async (req,res)=>{
    try{
        const hashedPass = await bcrypt.hash(req.body.NewPass,10);
       
        var waitforgetAdminrbyID = new Promise((resolve, reject) => {
            const cursor = db.collection('admins').find({_id : mongoose.Types.ObjectId(req.body.AdminId)});
              cursor.each(function(err, doc) {
                    resolve(doc)})  
              });
          
             waitforgetAdminrbyID.then((User) => {
                 try {
                     var waitforpass = new Promise((resolve, reject) => {
                        var passiscorrect = bcrypt.compare(req.body.OldPass,User.pass)
                        resolve(passiscorrect)
                     })

                     waitforpass.then((passiscorrect) => {
                        if(passiscorrect){
                            if(req.body.OldPass === req.body.NewPass){
                                res.send("Failed! The old password and the new one cannot be the same!")
                            }
                            if(req.body.ConfirmNewPass !== req.body.NewPass){
                                res.send("Failed! The new password and the confirmation password do not match!")
                            }

                            var myquery = { _id: mongoose.Types.ObjectId(req.body.AdminId)};
                            var newvalues = { $set: { pass: hashedPass} };

                            db.collection("admins").updateOne(myquery, newvalues, function(err, res) {
                                if (err) throw err;
                            });
                            res.send("Password updated successfully!")
                         } else {
                            res.send("Failed! You have entered an incorrect old password!")
                         }
                     })
                    } catch (e) {
                         res.json({message:err});
                    }})
    }catch(err){
        res.json({message:err});
    }    
});

module.exports=router;
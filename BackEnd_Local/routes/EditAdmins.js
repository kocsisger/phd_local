if(process.env.NODE_ENV !== 'production'){ //ha a környezet nem lenne töltenne be
    require('dotenv').config()
}

const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');
const db = mongoose.connection;

router.post('/', async (req,res)=>{
       
    try{

    var waitforgetTeacherbyID = new Promise((resolve, reject) => {
        const cursor = db.collection('admins').find({_id : mongoose.Types.ObjectId(req.body.AdminID)});
          cursor.each(function(err, doc) {
                resolve(doc)})  
          });

          waitforgetTeacherbyID.then((User) => {
            try {
                 var myquery = { _id: User._id};
                    var newvalues = { $set: { firstname: req.body.FirstName,lastname:req.body.LastName,email:req.body.Email} };

                       db.collection("admins").updateOne(myquery, newvalues, function(err, res) {
                           if (err) throw err;
                       });
                       res.send("Successfully Saved Changes")
               } catch (e) {
                    res.json({message:e});
            }})

    }catch(err){
        res.json({message:err});
    }    
});


module.exports=router;


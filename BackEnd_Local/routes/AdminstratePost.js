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
        const cursor = db.collection('posts').find({_id : mongoose.Types.ObjectId(req.body.PostID)});
          cursor.each(function(err, doc) {
                resolve(doc)})  
          });

          waitforgetTeacherbyID.then((User) => {
            try {
                 var myquery = { _id: User._id};
                 var newvalues = { $set: {state:2,tstatus:"Administrated"} };

                       db.collection("posts").updateOne(myquery, newvalues, function(err, res) {
                           if (err) throw err;
                       });
                       res.send("Successfully Administrated the Post")
               } catch (e) {
                    res.json({message:e});
            }})

    }catch(err){
        res.json({message:err});
    }    
});


module.exports=router;


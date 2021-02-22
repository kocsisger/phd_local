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
        const cursor = db.collection('users').find({_id : mongoose.Types.ObjectId(req.body.UserID)});
          cursor.each(function(err, doc) {
                resolve(doc)})  
          });

          waitforgetTeacherbyID.then((User) => {
            try {
                 var myquery = { _id: User._id};
                    var newvalues = { $set: { firstname: req.body.firstname,lastname:req.body.lastname,email:req.body.email,
                    phonenumber:req.body.phonenumber,neptuncode:req.body.neptuncode,supervisor:req.body.supervisor,supervisorID:req.body.supervisorID,doctoralprogram:req.body.doctoralprogram,
                    coursetype:req.body.coursetype,semester:Number(req.body.semester),programdirector:req.body.programdirector} };

                       db.collection("users").updateOne(myquery, newvalues, function(err, res) {
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

router.post('/addnewsemester', async (req,res)=>{
       
    try{
     db.collection('users').updateMany(
            {}, // query
            {$inc: {semester: 1}}); 
            res.send("Succes Semester update!");
    }catch(err){
        res.json({message:err});
    }    
});


module.exports=router;


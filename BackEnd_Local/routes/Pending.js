if(process.env.NODE_ENV !== 'production'){ //ha a környezet nem lenne töltenne be
    require('dotenv').config()
}

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const PostKey = require('../models/KeyAndId')
const Str = require('@supercharge/strings');
const SendEmail = require('./EmailSender'); 
const NAE =require('../models/NameAndEmail');
const USERS =require('../models/Users');
const mongoose = require('mongoose');
const db = mongoose.connection;

router.get('/',async (req,res)=>{
    try{
    const post = await Post.find({state:0});
    let ids = []

    var waitforgetArray = new Promise((resolve, reject) => {
            for(i = 0; i < post.length; i++){
                ids[i] =  mongoose.Types.ObjectId(post[i].user);
            }
            resolve();
          });

          waitforgetArray.then(() => {
            try {
                 var waitforgetUsersbyIDArray= new Promise((resolve, reject) => {
                    const users = db.collection('users').find({ "_id": { "$in": ids } });
                    users.toArray(function(err,doc) {
                        resolve(doc)
                      })
                    });
               
                  waitforgetUsersbyIDArray.then((User) => {
                    res.json(User);
                  })
               } catch (e) {
                    res.json({message:e});
            }})
    
    
    }catch(err){
        res.json({message:err});
    }
});

router.get('/:user/getuserpendingsubjects',async (req,res)=>{
  try{
  const post = await Post.find({ user: req.params.user,state: 0})
  res.json(post);
  }catch(err){
      res.json({message:err});
  }  
});

router.post('/pending/accept', async (req,res)=>{
  try{
  var waitforgetTeacherbyID = new Promise((resolve, reject) => {
      const cursor = db.collection('posts').find({_id : mongoose.Types.ObjectId(req.body.PostID)});
        cursor.each(function(err, doc) {
              resolve(doc)})  
        });

        waitforgetTeacherbyID.then((User) => {
          try {
               var myquery = { _id: User._id};
               var newvalues = { $set: {state:1,tstatus:"Accepted"} };

                     db.collection("posts").updateOne(myquery, newvalues, function(err, res) {
                         if (err) throw err;
                     });
                     res.send("Successfully Accept the Post")
             } catch (e) {
                  res.json({message:e});
          }})

  }catch(err){
      res.json({message:err});
  }    
});

router.post('/pending/decline', async (req,res)=>{
  try{
  var waitforgetTeacherbyID = new Promise((resolve, reject) => {
      const cursor = db.collection('posts').find({_id : mongoose.Types.ObjectId(req.body.PostID)});
        cursor.each(function(err, doc) {
              resolve(doc)})  
        });

        waitforgetTeacherbyID.then((User) => {
          try {
               var myquery = { _id: User._id};
               var newvalues = { $set: {state:1,tstatus:"Declined"} };

                     db.collection("posts").updateOne(myquery, newvalues, function(err, res) {
                         if (err) throw err;
                     });
                     res.send("Successfully Declined the Post")
             } catch (e) {
                  res.json({message:e});
          }})

  }catch(err){
      res.json({message:err});
  }    
});

router.post('/pending/resend', async (req,res)=>{
  try{
    
    const post = await Post.findOne({_id : mongoose.Types.ObjectId(req.body.PostID)})
    const Student = await USERS.findOne({_id:post.user})
    const TName = await NAE.findOne({TeacherName:post.oktato})
    const Key = await PostKey.findOne({postid : post._id})

    const url=`
    Tisztelt ${post.oktato}!<br><br>
    Tisztelettel szeretnénk emlékeztetni, hogy  ${Student.lastname} ${Student.firstname} PhD hallgató nemrégiban kérvényezte a(z)  ${post.targy} tárgy elfogadását neptunban történő felvételre.<br>
    Kérjük tegye meg a nyilatkozatát az alábbi linken:
    <p>http://localhost:3000/subjectupdate?uid=${post.user}&pid=${post._id}&aid=${TName._id}&key=${Key.key}</p>`  
    const Subject = "Tárgyfelvétel emlékeztető";
    SendEmail(url,TName.TeacherEmail, Subject);
    res.json("Successfully Email resend");

  }catch(err){
      res.json({message:err});
  }    
});

module.exports=router;
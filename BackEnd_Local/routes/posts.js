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


//get back all the posts
/*router.get('/', async (req,res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});*/

    
//summits a post
router.post('/', async (req,res)=>{
    const post = new Post ({
        user: req.body.user,
        targy: req.body.targy,
        oktato: req.body.oktato,
    });
    try{
    const savedPost = await post.save();
    
    
    const Key = new PostKey({
        postid:savedPost._id,
        key:Str.random(20),
    });

    const TName = await NAE.findOne({TeacherName:post.oktato})
    const Student = await USERS.findOne({_id:post.user})
    Key.save();
    const url=`
    Tisztelt ${post.oktato}!<br><br>
    ${Student.lastname} ${Student.firstname} Kérvényezte a(z) ${post.targy} tárgy felvételének elfogadását.<br>
    A nyilatkozattételt megteheti az alábbi linken.
    <p>http://localhost:3000/subjectupdate?uid=${post.user}&pid=${post._id}&aid=${TName._id}&key=${Key.key}</p>`  
    const Subject = "Tárgyfelvétel";
    SendEmail(url,TName.TeacherEmail, Subject);
    const urlS=`
    Tisztelt ${Student.supervisor}!<br><br>
    Ezúton tájékoztatjuk, hogy ${Student.lastname} ${Student.firstname} hallgató, az ön témavezetettje felvételre jelölte a ${post.oktato} oktató, ${post.targy} című tárgyát.<br>
    Ez a levél csak tájékoztatás jellegű, az adminisztrációval kapcsolatban önnek nincs teendője.<br>
    ------------------------------------------------------------------------------------------------
    `

    const supervisorname = await NAE.findOne({_id:Student.supervisorID});
    const SubjectS = "Témavezető értesítés";
    SendEmail(urlS,supervisorname.TeacherEmail, SubjectS);

    res.json(savedPost);
    }catch(err){
        res.json({message:err});
    }    
});


//specific post
router.get('/:user',async (req,res)=>{
    var currdate = new Date()    
    currdate.getMonth()>8? currdate.setMonth(8):currdate.getMonth()<1?currdate.setMonth(-3):currdate.setMonth(1)
    currdate.setDate(0)
    try{
    const post = await Post.find({ user: req.params.user,date: { $gt: currdate}})
    res.json(post);
    }catch(err){
        res.json({message:err});
    }
     
});

router.get('/:subject/notadministrated',async (req,res)=>{
    try{
    const post = await Post.find({state: 1,tstatus:"Accepted"});
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

router.get('/:user/getusernotadministratedsubjects',async (req,res)=>{
    try{
    const post = await Post.find({ user: req.params.user,state: 1,tstatus:"Accepted"})
    res.json(post);
    }catch(err){
        res.json({message:err});
    }
     
});


router.get('/:user/:postId', async (req,res)=> {    
    try{
    const post = await Post.find({ user: req.params.user,_id:req.params.postId})
    res.json(post);
    }catch(err){
        //res.json({message:err});
        res.json("error");
    }

});

router.get('/:user/history/h',async (req,res)=>{
    var currdate = new Date()
    //currdate.setMonth(currdate.getMonth()>8? currdate.getMonth()-(currdate.getMonth()-8):currdate.getMonth()<1 ?currdate.getMonth()-(currdate.getMonth()-3):currdate.getMonth()-3 )
    currdate.getMonth()>8? currdate.setMonth(8):currdate.getMonth()<1?currdate.setMonth(-3):currdate.setMonth(1)
    currdate.setDate(0)
    try{
    const post = await Post.find({ user: req.params.user,date: { $lte: currdate}})
    res.json(post);
    }catch(err){
        res.json({message:err});
    }
     
});

//delete a specific post
router.delete('/:user/:postId', async (req,res)=>{
   
    try{
        const removedPost = await Post.remove({_id:req.params.postId});
        res.json(removedPost);
        }catch(err){
            res.json({message:err});
        }
});

//Update a post
router.patch('/:user/:postId', async (req,res)=> {
    try{

        const updatedPost = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{status:req.body.status}  }
            );
            
        res.json(updatedPost);

        }catch(err){
            res.json({message:err});
        }

});

module.exports=router;


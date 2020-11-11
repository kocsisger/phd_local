const express = require('express');


const router = express.Router();
const Post =require('../models/Subjects');


//get back all the posts
router.get('/', async (req,res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

router.post('/', async (req,res)=>{
    const post = new Post ({
        Subject: req.body.Subject,
        Teacher: req.body.Teacher,              
        
    });
    try{
    const savedPost = await post.save();
    res.json(savedPost);
    }catch(err){
        res.json({message:err});
    }    
    

});

module.exports=router;


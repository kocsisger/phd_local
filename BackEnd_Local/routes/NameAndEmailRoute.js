const express = require('express');
const router = express.Router();
const Post =require('../models/NameAndEmail');


//get back all the posts
router.get('/', async (req,res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

router.get('/:userId', async (req,res)=> {    
    try{
    const post = await Post.find({_id:req.params.userId})
    res.json(post);
    }catch(err){
        res.json({message:err});
    }

});

router.post('/', async (req,res)=>{
    const post = new Post ({
        TeacherName: req.body.TeacherName,
        TeacherEmail: req.body.TeacherEmail,              
        
    });
    try{
    const savedPost = await post.save();
    res.json(savedPost);
    }catch(err){
        res.json({message:err});
    }    
    

});

module.exports=router;


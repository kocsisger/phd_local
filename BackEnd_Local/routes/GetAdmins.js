const express = require('express');
const router = express.Router();
const Post = require('../models/Admins');


//get back all the posts
router.get('/', async (req,res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

//summits a post
router.post('/', async (req,res)=>{
    const post = new Post ({
        TeacherName: req.body.TeacherName,
        TeacherEmail: req.body.TeacherEmail, 
    });
    try{
    await post.save();
    res.send("Succes Teacher Registration!")
    }catch(err){
        res.json({message:err});
    }    
});


//specific post
router.get('/:postId',async (req,res)=>{
    
    try{
    const post = await Post.findById(req.params.postId);
    res.json(post);
    }catch(err){
        res.json({message:err});
    }
     
});

//delete a specific post
router.delete('/:postId', async (req,res)=>{
   
    try{
        const removedPost = await Post.remove({_id:req.params.postId});
        res.json(removedPost);
        }catch(err){
            res.json({message:err});
        }
});

//Update a post
router.patch('/:postId', async (req,res)=> {
    try{

        const updatedPost = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{targy:req.body.targy}  }
            );
            
        res.json(updatedPost);

        }catch(err){
            res.json({message:err});
        }

});

module.exports=router;


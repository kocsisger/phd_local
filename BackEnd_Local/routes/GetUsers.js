const express = require('express');
const router = express.Router();
const Post = require('../models/Users');

router.get('/:user',async (req,res)=>{   
    try{
    const post = await Post.findOne({_id:req.params.user})    
    res.json(post.lastname+" "+post.firstname);
    }catch(err){
        res.json("error");
    }
     
});

router.get('/', async (req,res) => { //visszaadja admin részre az összes user adatot
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

module.exports=router;


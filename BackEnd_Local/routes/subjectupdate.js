const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const NameAndEmail = require('../models/NameAndEmail');
const PostKey = require('../models/KeyAndId')
//Update a post
/*router.patch('/pdirector/:user/:postId', async (req,res)=> {
    try{

        const updatedPost = await Post.updateOne(
            {_id:req.params.postId,user:req.params.user},
            {$set:{pdstatus:req.body.pdstatus,tstatus,state:2}}
            );
            
        res.json(updatedPost);

        }catch(err){
            res.json({message:err});
        }

});*/
router.patch('/teacher/:user/:postId/:key', async (req,res)=> {

     
        try{
        const Key = await PostKey.findOne({postid:req.params.postId})
        if(Key.key===req.params.key)
        {
            try{

                const updatedPost = await Post.updateOne(
                    {_id:req.params.postId,user:req.params.user},
                    {$set:{tstatus:req.body.tstatus,state:1}}
                    );
                    
                    
                PostKey.deleteOne({postid:req.params.postId},function (err) {});    
                res.json("success");
        
                }catch(err){
                    res.json({message:err});
                }
        }
        else
        res.send("Failed Key")

        }catch(err){
            res.send("Error")
        }
    
   


    

});
module.exports=router;


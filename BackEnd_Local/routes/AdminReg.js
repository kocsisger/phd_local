const Admins = require('../models/Admins');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async (req,res)=>{
    try{
    const hashedPass = await bcrypt.hash(req.body.pass,10)
    const Admin = new Admins ({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        pass: hashedPass
    });

    await Admin.save();
    res.send("Succes Admin registration!")
    }catch(err){
        res.json({message:err});
    }    
});

module.exports=router;
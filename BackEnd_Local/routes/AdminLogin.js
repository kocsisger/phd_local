const express = require('express');
const router = express.Router();
const passport = require('passport'); 
const flash = require("express-flash");
const session = require("express-session");
const initializePassport = require('../passport-config'); 
var arrayForLoggedUsers = [];
const bcrypt = require('bcrypt');
var generator = require('generate-password');

router.use(flash())
router.use(passport.initialize())
router.use(passport.session())

initializePassport(passport)

router.post('/', passport.authenticate("admin"), async (req,res) => {
    try{
        if(req.isAuthenticated()){
            req.user.pass = null;
            const token = generator.generate({
                length: 11,
                numbers: true
            });
            const hashedToken = await bcrypt.hash(token,10);
            var i = 0;
            
            for( i = 0; i < arrayForLoggedUsers.length; i++){
                if(arrayForLoggedUsers[i].id.equals(req.user._id)){
                    arrayForLoggedUsers[i].createdAt = Date.now();
                    arrayForLoggedUsers[i].userToken = token;
                    break;
                }
            }
    
            if(i == arrayForLoggedUsers.length){
                arrayForLoggedUsers.push({createdAt:Date.now(), id:req.user._id, userToken: token});
            }
    
            const newUserData = { 
               token:hashedToken,
                _id : req.user._id,
               email : req.user.email,
               username : req.user.username,
               firstname : req.user.firstname,
               lastname : req.user.lastname
            };
            res.send(newUserData);
        }
    }catch(err){
                res.json({message:err});
    } 
}
)


router.post('/allow/:userID', async (req,res) => {
    try{
        if(req.params.userID == "null"){
            throw Error ('Fatal')
        }else{
            var accept = 0;
            for( i = 0; i < arrayForLoggedUsers.length; i++){
                if(arrayForLoggedUsers[i].id.equals(req.params.userID) &&  await bcrypt.compare(arrayForLoggedUsers[i].userToken,req.body.token)){
                    accept = 1;
                }
            }
            if(accept == 1){
                res.send();
            }else{
                throw Error ('Fatal')
            }
        }
       
    }catch(err){
        res.status(404).json("Fatal Error");
    } 
});

module.exports=router;
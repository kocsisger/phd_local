const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        firstname:{ 
            type:String,
            required:true,
        },
        lastname:{ 
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },

        phonenumber:{
            type:String,
            required:true,
        },

        neptuncode: {
            type:String,
            required:true
        },
        supervisor: {
            type:String,
            required:true
        },
	supervisorID: {
	    type:String,
	    required:true
	},
        doctoralprogram:{
            type:String,
            required:true
        },
        coursetype:{
            type:String,
            required:true
        },
        semester:{
            type:Number,
            required:true
        },
        programdirector:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true,
	    unique:true
        },
        pass:{
            type:String,
            required:true  
        }
 })

module.exports=mongoose.model('User',UserSchema);

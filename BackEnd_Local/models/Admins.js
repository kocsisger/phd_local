const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema(
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

        username:{
            type:String,
            required:true,
        },

        pass: {
            type:String,
            required:true
        },
 })

module.exports=mongoose.model('Admin',AdminSchema);
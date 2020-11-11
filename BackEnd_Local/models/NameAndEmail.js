const mongoose = require('mongoose');

const NameAndEmailSchema = mongoose.Schema(
    {

        TeacherName:{
            type:String,
            required:true,            
        },

        TeacherEmail: {
            type:String,
            required:true
        },
        
       
 })

module.exports=mongoose.model('NameAndEmail',NameAndEmailSchema);
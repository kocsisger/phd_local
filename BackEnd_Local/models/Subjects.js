const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema(
    {

        Subject:{
            type:String,
            required:true,
            default:1,
        },
        SubjectEN:{
            type:String,
            required:true,
            default:1,
        },
        Teacher: {
            type:String,
            required:true
        },
        
       
 })

module.exports=mongoose.model('Subjects',SubjectSchema);
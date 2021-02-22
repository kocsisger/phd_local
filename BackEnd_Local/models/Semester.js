const mongoose = require('mongoose');

const SemesterSchema = mongoose.Schema(
    {
        startDate:{
            type:String,
            required:true,
            default: ""
        },
        endDate: {
            type:String,
            required:true,
            default: ""
        },        

 })

module.exports=mongoose.model('semesters', SemesterSchema );
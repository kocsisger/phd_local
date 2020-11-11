const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        

        user:{
            type:String,
            required:true,            
        },
        targy: {
            type:String,
            required:true
        },
        oktato: {
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date(),
        },
        tstatus: {
            type:String,
            required:true,
            default: "Pending"
        },        
        state: {
            type:Number,
            required:true,
            default: 0,
        },    

 })

module.exports=mongoose.model('Posts',PostSchema);
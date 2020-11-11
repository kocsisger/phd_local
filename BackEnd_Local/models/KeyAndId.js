const mongoose = require('mongoose');

const KeySchema = mongoose.Schema(
    {
        
        key: {
            type:String,
            required:true
        },
        postid: {
            type:String,
            required:true
        }

        

 })

module.exports=mongoose.model('Keys',KeySchema);
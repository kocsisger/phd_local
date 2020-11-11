const mongoose = require('mongoose');

const DoctoralPSchema = mongoose.Schema(
    {
        ProgramName:{ 
            type:String,
            required:true,
        },
        ProgramDirectorName:{ 
            type:String,
            required:true,
        },
 })

module.exports=mongoose.model('DoctoralPrograms',DoctoralPSchema);
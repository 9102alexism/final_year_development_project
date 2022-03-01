const mongoose = require('mongoose');

const promoteSchema = mongoose.Schema({
    medId:{
        unique:true,
        type: String,
        required: true
    },
    companyId:{
        type:String,
        required: true
    },
    manf:{
        type:mongoose.Types.ObjectId,
        ref:"Pharmaceutical"
    }
});

module.exports = promoteSchema;
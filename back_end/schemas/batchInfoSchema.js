const mongoose = require('mongoose');
const batchInfoSchema = mongoose.Schema({
    medId:{
        type:String,
        required: true
    },
    batchNumber:{
        type: String,
        required:true
    },
    companyId:{
        type:String,
        required: true
    },
    count:{
        type:Number,
        required: true
    },
    zone:{
        type:String,
        required:true
    },
    manf:{
        type:mongoose.Types.ObjectId,
        ref:"Pharmaceutical"
    }
});

module.exports = batchInfoSchema;
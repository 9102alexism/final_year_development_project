const mongoose = require('mongoose');
const medSchema = mongoose.Schema({
    brandName:{
        type: String,
        required: true
    },
    genericName:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    medType:{
        type: String,
        required: true
    },
    weight:{
        type:Number,
        required: true
    },
    unitPrice:{
        type:Number,
        required: true
    },
    perPage:{
        type:Number,
        required: true
    },
    pagePrice:{
        type:Number,
        required: true
    },
    dept:{
        type:[String],
        default: 'General'
    },
    medId:{
        type:String,
        required: true
    },
    companyId:{
        type: String,
        required: true
    },
    manuf:{
        type: mongoose.Types.ObjectId,
        ref:"Pharmaceutical"
    }
});

module.exports = medSchema;
const mongoose = require('mongoose');
const pharmaceutical = mongoose.Schema({
    companyName : {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    companyId:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    products:{
        type:mongoose.Types.ObjectId,
        ref: "Medicine"
    }
});

module.exports = pharmaceutical;
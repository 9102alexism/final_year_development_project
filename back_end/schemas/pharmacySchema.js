const mongoose = require('mongoose');
const pharmacySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    eTIN: {
        type: String,
        required: true
    },
    operationHour:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    userId:{
        unique:true,
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    pharmacyId:{
        unique: true,
        type: String,
        required: true
    },
    zone:{
        type: String,
        required: true
    },
    inventory:[{
        type: mongoose.Types.ObjectId,
        ref: "Inventory"
    }],
    sales:[{
        type: mongoose.Types.ObjectId,
        ref: "Sales"
    }]
});

module.exports = pharmacySchema;
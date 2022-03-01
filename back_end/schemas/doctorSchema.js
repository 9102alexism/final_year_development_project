const mongoose = require('mongoose');
const doctorSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    dept:{
        type: String,
        required: true
    },
    institute: {
        type: String,
        required: true
    },
    role: String,
    degree:{
        type: String,
        required: true
    },
    specializedFields: String,
    regNumber:{
        type: String,
        required: true
    },
    address:String,
    visitHour:[String],
    offDay:[String],
    phone:String,
    userId:String,
    password:String,
    doctorId:{
        type: String,
        required: true
    },
    prescription:[{
        type: mongoose.Types.ObjectId,
        ref: "Prescription"
    }]
});

module.exports = doctorSchema;
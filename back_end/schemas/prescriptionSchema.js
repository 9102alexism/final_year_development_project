const mongoose = require("mongoose");

const prescriptionSchema = mongoose.Schema({
    department: {
    type: String,
    required: true,
  },
  date:{
      type: String,
    required: true
  },
  patient_name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female']
  },
  age:{
      type: Number,
      required: true
  },
  age_type: String,
  blood_group:{
    type: String,
    required: true
  },
  weight:{
    type: Number,
    required: true
  },
  paid:{
    type: Number,
    required: true
  },
  currency: String,
  bp:{
    type: String,
    required: true
  },
  pulse:{
    type: Number,
    required: true
  },
  complaint:{
      type: [String],
      required: true
  },
  examinations:{
      type: [String],
      required: true
  },
  diagnosis:{
      type: [String],
      required: true
  },
  investigation: [String],
  advice:{
      type: [String],
      required: true
  },
  follow_up:{
      type:String,
      required: true
  },
  medicine:{
      type:[{morning:Number, noon:Number, night:Number, id:String, name:String, duration:Number, total_count:Number}],
      required: true
  },
  prescriptionId:String,
  doctor:{
    type: mongoose.Types.ObjectId,
    ref: "Doctor"
  }
});


module.exports = prescriptionSchema;
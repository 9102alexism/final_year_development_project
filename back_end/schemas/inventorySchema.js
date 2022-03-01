const mongoose = require('mongoose');
const inventorySchema = mongoose.Schema({

    pharmacyName:{
        type:String,
        required: true
    },
    pharmacyId:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    medName: String, medQty: Number, unitPrice: Number, medId: String, batchNumber: String, medCount: Number, shelfNumber : String,
    pharmacy:{
        type: mongoose.Types.ObjectId,
        ref: "Pharmacy"
    }
});

module.exports = inventorySchema;
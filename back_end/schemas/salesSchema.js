const mongoose = require('mongoose');
const salesSchema = mongoose.Schema({
    date:{
        type: String,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    medicines:{
        type:[{
            name: String,
            medId: String,
            totalPurchased: Number,
        }],
        required: true
    },
    pharmacyId:{
        type:String,
        required: true
    },
    pharmacy:{
        type:mongoose.Types.ObjectId,
        ref: "Pharmacy"
    }

});

module.exports = salesSchema;
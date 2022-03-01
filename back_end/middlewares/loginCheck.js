const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const doctorSchema = require('../schemas/doctorSchema');
const pharmacySchema = require('../schemas/pharmacySchema');
const pharmaSchema = require('../schemas/pharmaceuticalScheama');
const inventorySchema = require('../schemas/inventorySchema');
const Doctor = new mongoose.model("Doctor", doctorSchema);
const Pharmacy = new mongoose.model("Pharmacy", pharmacySchema);
const Pharmaceutical = new mongoose.model("Pharmaceutical", pharmaSchema);
const Inventory = new mongoose.model("Inventory", inventorySchema);

// Doctor

const docLoginChecker = async(req, res, next) =>{

    if(req.body.userId && req.body.password){

        try{
            // Auth & Fetching
            const data = await Doctor.findOne({ userId: req.body.userId });
            const result = await bcrypt.compareSync(req.body.password, data.password);

            if(result){
                const {name, dept, institute, role, degree, specializedFields, regNumber, address, visiHour, offDay, phone, userId, doctorId} = data;
                let userData = {name, dept, institute, role, degree, specializedFields, regNumber, address, visiHour, offDay, phone, userId, doctorId};
                //jwt prepare
                const token = jwt.sign(userData, process.env.JWT_KEY, {expiresIn : '24h'});

                res.data = {...userData, token};
            next();
            }else{
                next('Auth Failed!');
            }   
        }catch(err){
            next(err);
        }
    }else{
        next('Auth Failed!');
    }
};

// Pharmacy

const pharmacyLoginChecker = async(req, res, next)=>{
    if(req.body.userId && req.body.password){
        try{
            let data = await Pharmacy.findOne({ userId: req.body.userId }).select({
                inventory:0,
                sales:0,
                _id:0
            });
            const result = await bcrypt.compareSync(req.body.password, data.password);
            if(result){
                const token = jwt.sign(data.toJSON(), process.env.JWT_KEY, {expiresIn : '24h'});
                const invData = await Inventory.find({pharmacyId: data.pharmacyId});
                let obj = {};
                let arr = [];
                for (const inv of invData) {
                    obj.medName = inv.medName;
                    obj.medId = inv.medId;
                    obj.medQty = inv.medQty;
                    obj.unitPrice = inv.unitPrice;
                    obj.shelfNumber = inv.shelfNumber;
                    arr.push(obj);
                    obj = {};
                }

                res.data = {data, token, meds: arr};
                next();
            }else{
                next('Auth Failed!');
            }  
        }catch(err){
            next(err);
        }
    }else{
        next('Auth Failed!');
    }
}

// Pharmaceutical

const pharmaceuticalLoginCheck = async(req, res, next)=>{
    if(req.body.userId && req.body.password){
        try{
            let data = await Pharmaceutical.findOne({ userId: req.body.userId }).select({
                _id: 0
            });
            const result = await bcrypt.compareSync(req.body.password, data.password);
            if(result){
                const token = jwt.sign(data.toJSON(), process.env.JWT_KEY, {expiresIn : '6h'});
                res.data = {data, token};    
                next();
            }else{
                next('Auth Failed!');
            }  
        }catch(err){
            next(err);
        }
    }else{
        next('Auth Failed!');
    }
}

module.exports = {docLoginChecker, pharmacyLoginChecker, pharmaceuticalLoginCheck};
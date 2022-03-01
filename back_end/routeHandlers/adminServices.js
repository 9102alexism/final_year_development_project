
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Schemas
const doctorSchema = require('../schemas/doctorSchema');
const pharmaceuticalSchema = require('../schemas/pharmaceuticalScheama');
const pharmacySchema = require('../schemas/pharmacySchema');
const medSchema = require('../schemas/medShcema');

// Models
const Pharmaceutical = new mongoose.model("Pharmaceutical", pharmaceuticalSchema);
const Pharmacy = new mongoose.model("Pharmacy", pharmacySchema);
const Doctor = new mongoose.model("Doctor", doctorSchema);
const Medicine = new mongoose.model("Medicine", medSchema);

// Middlewares
const checker = require('../middlewares/infoChecker');

const router = express.Router();
router.use(express.json());


router.post('/addDoctor', async(req, res)=>{
    
    const hashed = await bcrypt.hash(req.body.password, parseInt(process.env.SALT));
    req.body.password = hashed;
    req.body.doctorId = `DR${Date.now()}`;
    const newDoctor = new Doctor(req.body);
    try{
        await newDoctor.save();
        res.status(200).json({
            message: "Doctor info was inserted successfully!",
        });
    }catch(err){
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
});


router.post('/addDoctors', async(req, res) =>{

    let arr = req.body;

    let data = [];
    let count = 0;
    const salt = parseInt(process.env.SALT);

    try{
        
        for (d of arr) {
            d.password = "$2b$10$5BksS3FMWpIpWI3fvI/CAeNVHDLpQUaw73EzieGlxpoxaPLyS.6qu"; // 123456789 -> Hashed Pass 
            d.doctorId = `DR${Date.now() + (count * (Math.floor((Math.random() * salt) + 1)) * (Math.floor((Math.random() * (salt * Math.floor((Math.random() * 5) + 1))) + 1)))}`;
            data.push(d);
            count++;
        }
        
        await Doctor.insertMany(data);
        res.status(200).json({
            message: "Doctor info were inserted successfully!",
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            err
        });
    }
});


router.post('/doctorSignUp', checker.docInfoChecker, async(req, res)=>{

    try{
        const hashed = await bcrypt.hash(req.body.password, parseInt(process.env.SALT));
        req.body.password = hashed;

        let id = `DR${Date.now()}`;
        req.body.doctorId = id;

        const newDoctor = new Doctor(req.body);
        await newDoctor.save();
        res.status(200).json({
            message: "Doctor info was inserted successfully!",
        });
    }catch(err){
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
});

// Pharmacy

router.post('/pharmacySignUp', checker.pharmacyInfoChecker, async(req, res)=>{
    try{
        const hashed = await bcrypt.hash(req.body.password, parseInt(process.env.SALT));
        req.body.password = hashed;

        let id = `PM${Date.now()}`;
        req.body.pharmacyId = id;

        console.log(req.body);
        const newPharmacy = new Pharmacy(req.body);
        await newPharmacy.save();
        res.status(200).json({
            message: "Pharmacy info was inserted successfully!",
        });
    }catch(err){
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
});

router.post('/addPharmacies', async(req, res) =>{

    let arr = req.body;
    let data = [];
    let count = 0;
    const salt = parseInt(process.env.SALT);

    try{

        for (d of arr) {
            d.password = "$2b$10$5BksS3FMWpIpWI3fvI/CAeNVHDLpQUaw73EzieGlxpoxaPLyS.6qu"; // 123456789 -> Hashed Pass 
            d.pharmacyId = `PM${Date.now() + (count * (Math.floor((Math.random() * salt) + 1)) * (Math.floor((Math.random() * (salt * Math.floor((Math.random() * 5) + 1))) + 1)))}`;
            data.push(d);
            count++;
        }

        await Pharmacy.insertMany(data);
        res.status(200).json({
            message: "Pharmacies info were inserted successfully!",
        });
    }catch(err){
        console.log(err)
        res.status(500).json({
            err
        });
    }
});

// Pharmaceutical Companies

router.post('/pharmaSignUp', checker.pharmaInfoChecker, async(req, res) =>{
    try{
        const hashed = await bcrypt.hash(req.body.password, parseInt(process.env.SALT));
        req.body.password = hashed;

        let id = `PC${Date.now()}`;
        req.body.companyId = id;

        const pharma = new Pharmaceutical(req.body);
        await pharma.save();
        res.status(200).json({
            message: "Pharma info was inserted successfully!",
        });
    }catch(err){
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
});

router.post('/addPharmaCompanies', async(req, res) =>{

    let arr = req.body;
    let data = [];
    let count = 0;
    const salt = parseInt(process.env.SALT);

    try{
        for (d of arr) {
            d.password = "$2b$10$5BksS3FMWpIpWI3fvI/CAeNVHDLpQUaw73EzieGlxpoxaPLyS.6qu"; // 123456789 -> Hashed Pass 
            d.companyId = `PC${Date.now() + (count * (Math.floor((Math.random() * salt) + 1)) * (Math.floor((Math.random() * (salt * Math.floor((Math.random() * 5) + 1))) + 1)))}`;
            data.push(d);
            count++;
        }

        await Pharmaceutical.insertMany(data);
        res.status(200).json({
            message: "Pharma info were inserted successfully!",
        });
    }catch(err){
        console.log(err)
        res.status(500).json({
            err
        });
    }
});

router.post('/idSep', (req, res)=>{
    const data = req.body;
    let id = "PC1645732958658";
    id = id.trim();
    let arr = [];

    for (const d of data) {
        if(d.companyId === id){
            arr.push(d);
        }
    }
    res.send(arr);
});

router.post('/addMedicines', async(req, res) =>{

    let arr = req.body;
    let data = [];
    let count = 0;
    const salt = parseInt(process.env.SALT);

    try{
        const id = await Pharmaceutical.findOne({companyId : req.body[0].companyId});
        for (d of arr) {
            d.medId = `MED${Date.now() + (count * (Math.floor((Math.random() * salt) + 1)) * (Math.floor((Math.random() * (salt * Math.floor((Math.random() * 5) + 1))) + 1)))}`;
            d.manuf = id._id;
            data.push(d);
            count++;
            
        }

        await Medicine.insertMany(data);
        res.status(200).json({
            message: "Med info were inserted successfully!",
        });
    }catch(err){
        console.log(err)
        res.status(500).json({
            err
        });
    }
});


module.exports = router;
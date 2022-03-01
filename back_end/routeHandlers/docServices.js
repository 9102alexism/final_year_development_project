
//Modules
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Schemas
const prescriptionSchema = require('../schemas/prescriptionSchema');
const doctorSchema = require('../schemas/doctorSchema');
const medSchema = require('../schemas/medShcema');

// Models
const Prescription = new mongoose.model("Prescription", prescriptionSchema);
const Doctor = new mongoose.model("Doctor", doctorSchema);
const Medicine = new mongoose.model("Medicine", medSchema);

// Middlewares
const loginChecker = require('../middlewares/loginCheck');
const router = express.Router();
router.use(express.json());

router.get('/login', (req, res)=>{
    res.render("doclogin");
});


router.post('/login/verify', loginChecker.docLoginChecker, (req, res)=>{
    const userData = res.data;
    res.status(200).send(userData);
});



router.post("/prescribe", (req, res) => {
    const authToken = req.headers.authorization;
    bodyData = req.body;
    jwt.verify(authToken, process.env.JWT_KEY, async(err, decoded) =>{
        if(!err){
            const id = await Doctor.findOne({userId: decoded.userId});
            prescriptionId = `PR${Date.now()}`;

            let date = new Date(Date.now());
            bodyData.date =  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`;
            x = {...bodyData, prescriptionId, doctor: id._id}
            const newPrescription = new Prescription(x);
            try{
                await newPrescription.save();
                res.status(200).json(prescriptionId);
            }catch(err){
                console.log(err);
                res.status(500).json({
                    error: "There was a server side error!",
                });
            }
        }else{
            res.status(500).send({message: 'There was a server side error!'});
        }
    });
  });

router.get('/history', (req, res)=>{
    jwt.verify(req.headers.authorization, process.env.JWT_KEY, async(err, decoded)=>{
        if(!err){
            const prescriptionData = await Prescription.find().populate("doctor").sort({date: -1});
            res.send(prescriptionData);
        }else{
            res.status(500).send({message: 'There was a server side error!'});
        }
    });
});

router.get('/prescription', (req, res)=>{
    const authToken = req.headers.authorization;
    jwt.verify(authToken, process.env.JWT_KEY, (err, decoded)=>{
        if(!err){
            res.status(200).send();
        }else{
            res.send(500).send({
                message: 'Server Side Error!'
            })
        }
    });
});

router.get('/medicines', (req, res)=>{
    const authToken = req.headers.authorization;
    jwt.verify(authToken, process.env.JWT_KEY, async(err, decoded)=>{
        const data = await Medicine.find();
        res.send(data);
    });
});


module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const medSchema = require('../schemas/medShcema');
const pharmaSchema = require('../schemas/pharmaceuticalScheama');
const batchInfoSchema = require('../schemas/batchInfoSchema');
const promoteSchema = require('../schemas/promoteSchema');
const Medicine = new mongoose.model("Medicine", medSchema);
const Pharmaceutical = new mongoose.model("Pharmaceutical", pharmaSchema);
const BatchInfo = new mongoose.model("BatchInfo", batchInfoSchema);
const Promote = new mongoose.model("Promote", promoteSchema);
const checker = require('../middlewares/loginCheck');



const router = express.Router();
router.use(express.json());


router.post('/login/verify', checker.pharmaceuticalLoginCheck, (req, res)=>{
    const data = res.data;
    res.send(data);
});

router.post('/addMedicine', (req, res)=>{
    const authToken = req.headers.authorization;
    jwt.verify(authToken, process.env.JWT_KEY, async(err, decoded)=>{
        if(!err){
            const company = await Pharmaceutical.findOne({companyName : decoded.companyName});
            if(company.companyName === decoded.companyName){
                const medId = `MED${Date.now()}`;
                req.body.medId = medId;
                req.body.companyId = decoded.companyId;
                req.body.companyName = decoded.companyName;
                const newMed = await Medicine(req.body);
                newMed.save();
                res.send({
                    message:'Submitted'
                });
            }else{
                res.status(500).send({
                    message: "Server Side Error!"
                });
            }
        }else{
            res.status(500).send({
                message: 'Server Side Error'
            });
        }
    });
});

router.post('/updateBatch', (req, res)=>{
    const authToken = req.headers.authorization;
    jwt.verify(authToken, process.env.JWT_KEY, async(err, decoded)=>{
        if(!err){
            try{
                const id = await Pharmaceutical.findOne({companyId:decoded.companyId});
                req.body.companyId = decoded.companyId;
                req.body.manf = id._id;
                const batch = new BatchInfo(req.body);
                await batch.save();

                res.status(200).send({
                    message: 'Batch added!',
                });
            }catch(err){
                console.log(err);
                res.status(500).send('Server Side Error!');
            }

        }else{
            console.log(err);
            res.status(500).send({
                message:'Server Side Error!'
            });
        }
    })
});

router.get('/products', (req, res)=>{
    const authToken = req.headers.authorization;
    jwt.verify(authToken, process.env.JWT_KEY, async(err, decoded)=>{
        if(!err){
            try{
                const data = await Medicine.find({companyId: decoded.companyId}).select({
                    _id:0
                });
                res.status(200).send(data);
            }catch(err){
                console.log(err);
                res.status(500).send({
                    message: 'Server Side Error!'
                });
            }
        }else{
            res.status(500).send({
                message: "Server Side Error!"
            });
        }
    });
});

router.post('/promote', (req, res)=>{
    const authToken = req.headers.authorization;
    jwt.verify(authToken, process.env.JWT_KEY, async(err, decoded)=>{
        if(!err){
            const data = await Promote.find({medId : req.body.medId});
            const id = await Pharmaceutical.findOne({companyId: decoded.companyId});
            req.body.companyId = decoded.companyId;
            req.body._id = id._id;
            console.log(id);
            console.log(req.body);
            if(data.length < 1){
                const promote = new Promote(req.body);
                await promote.save();
                res.status(200).send({
                    message: 'Promotion Added!'
                });
            }else{
                res.status(500).send({
                    message:'Server Side Error!'
                });
            }
        }else{
            res.status(500).send({
                message:'Server Side Error!'
            });
        }
    });
});

module.exports = router;
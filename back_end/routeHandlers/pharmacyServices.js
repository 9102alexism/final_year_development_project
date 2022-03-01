const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const XMLHttpRequest = require("xhr2");
const objtoCSV = require('objects-to-csv');
const medSchema = require('../schemas/medShcema');
const batchInfoSchema = require('../schemas/batchInfoSchema');
const pharmacySchema = require('../schemas/pharmacySchema');
const inventorySchema = require('../schemas/inventorySchema');
const salesSchema = require('../schemas/salesSchema');
const prescriptionSchema = require('../schemas/prescriptionSchema');
const pharmaSchema = require('../schemas/pharmaceuticalScheama');
const doctorSchema = require('../schemas/doctorSchema');
const promoteSchema = require('../schemas/promoteSchema');

const Medicine = new mongoose.model("Medicine", medSchema);
const BatchInfo = new mongoose.model("BatchInfo", batchInfoSchema);
const Pharmacy = new mongoose.model("Pharmacy", pharmacySchema);
const Inventory = new mongoose.model("Inventory", inventorySchema);
const Sales = new mongoose.model("Sales", salesSchema);
const Prescription = new mongoose.model("Prescription", prescriptionSchema);
const Pharmaceutical = new mongoose.model("Pharmaceutical", pharmaSchema);
const Doctor = new mongoose.model("Doctor", doctorSchema);
const Promote = new mongoose.model("Promote", promoteSchema);

const checker = require('../middlewares/loginCheck');
const req = require('express/lib/request');


const router = express.Router();
router.use(express.json());

router.get('/dashboard', (req, res) =>{
    const token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_KEY, (err, decoded)=>{     
        if(!err){
            res.status(200).send({
                data: decoded
            });
        }else{
            res.status(500).send({
                message: 'Server side error!'
            })
        }
    });
});

// Login
router.post('/login/verify', checker.pharmacyLoginChecker, async(req, res)=>{
    const data = res.data;
    res.send(data);
});

// Inventory

router.post('/inventory/data', (req, res)=>{
    const authToken = req.headers.authorization;
    jwt.verify(authToken, process.env.JWT_KEY, async(err, decoded)=>{
        if(!err){
            try{
                const data = await BatchInfo.findOne({batchNumber: req.body.batchNumber});
                if(req.body.medId.trim() === data.medId.trim() && decoded.zone.toLowerCase().trim() === data.zone.toLowerCase().trim()){
                    let finalData = await Medicine.findOne({medId : data.medId}).select({
                        _id: 0,
                        genericName: 0,
                        companyId: 0,
                        companyName:0,
                        medType:0,
                        weight:0,
                        pagePrice:0,
                        dept:0,
                        manuf:0
                    });
                    finalData.batchNumber = req.body.batchNumber;
                    res.status(200).send(finalData);
                }else{
                    res.status(500).send({
                        message: 'Server side error!'
                    });
                }
            }catch(err){
                console.log(err);
                res.status(500).send({
                    message: 'Server side error!'
                });
            }    
        }else{
            console.log(5);
            res.status(500).send({
                message: 'Server side error!'
            });
        }
    })
});

router.post('/inventory/submit', (req, res)=>{
    const authToken = req.headers.authorization;
    jwt.verify(authToken, process.env.JWT_KEY, async(err, decoded)=>{
        if(!err){
            console.log(req.body.type);
            if(req.body.type === 'create'){
                try{
                    const inv = await Inventory.findOne({pharmacyId: decoded.pharmacyId,medId: req.body.medId});
                    if(!inv){
                        const pharmacyData = await Pharmacy.findOne({pharmacyId:decoded.pharmacyId});
                        const batchData = await BatchInfo.findOne({medId: req.body.medId});
                        if(batchData.zone.toLowerCase().trim() === decoded.zone.toLowerCase().trim() && batchData.count >= req.body.medQty){
                            const date = new Date(Date.now());
                            req.body.date =  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`;
                            req.body.pharmacyName = decoded.name;
                            req.body.pharmacyId = decoded.pharmacyId;
                            req.body.pharmacy = pharmacyData._id;
                            console.log(req.body);
                            const newInv = new Inventory(req.body);
                            await newInv.save();
                            let x = batchData.count - req.body.medQty;
                            await BatchInfo.updateOne({batchNumber: batchData.batchNumber}, {$set:{
                                count : x
                            }});
                            res.status(200).send({
                                message:'Saved'
                            });
                        }else{
                            console.log(err);
                                res.status(500).send({
                                message:'Server Side Error!'
                            });
                        }  
                    }else{
                        console.log('Already Available');
                            res.status(500).send({
                            message:'Already Available'
                        });
                    }
                }catch(err){
                    console.log(err);
                    res.status(500).send({
                        message:'Server Side Error!'
                    });
                }
            }else if(req.body.type === 'update'){
                try{
                    const inv = await Inventory.findOne({pharmacyId: decoded.pharmacyId, medId: req.body.medId});
                    if(inv){
                        let amount = 0;
                        const pharmacyData = await Pharmacy.findOne({pharmacyId:decoded.pharmacyId});
                        const batchData = await BatchInfo.findOne({medId: req.body.medId});
                        amount = req.body.medQty - inv.medQty;
                        if(batchData.zone.toLowerCase().trim() === decoded.zone.toLowerCase().trim() && batchData.count >= req.body.medQty){
                            //const date = new Date(Date.now());
                            //req.body.date =  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`;
                            //req.body.pharmacyName = decoded.name;
                            //req.body.pharmacyId = decoded.pharmacyId;
                            //req.body.pharmacy = pharmacyData._id;
                            await Inventory.updateOne({pharmacyId: decoded.pharmacyId,medId: req.body.medId}, {$set:{
                                medQty : req.body.medQty,
                                shelfNumber : req.body.shelfNumber
                            }});
                            let x = batchData.count - amount;
                            await BatchInfo.updateOne({batchNumber: batchData.batchNumber}, {$set:{
                                count : x
                            }});
                            res.status(200).send({
                                message:'Edited'
                            });
                        }else{
                            console.log(err);
                                res.status(500).send({
                                message:'Server Side Error!'
                            });
                        }  
                    }else{
                        console.log('Not Found');
                            res.status(500).send({
                            message:'Not Found'
                        });
                    }
                }catch(err){
                    console.log(err);
                    res.status(500).send({
                        message:'Server Side Error!'
                    });
                }
            }else if(req.body.type === 'delete'){
                try{
                    await Inventory.deleteOne({pharmacyId : decoded.pharmacyId, medId: req.body.medId});
                    res.status(200).send({
                        message:'Successfully deleted!'
                    })
                }catch(err){
                    console.log(err);
                    res.status(500).send({
                        message:'Server Side Error!'
                    });
                }
            }
        }else{
            console.log(err);
            res.status(500).send({
                message:'Server Side Error!'
            });
        }
    })
});

router.get('/inventory', (req, res)=>{
    authToken = req.headers.authorization;
    jwt.verify(authToken, process.env.JWT_KEY, async(err, decoded)=>{
        if(!err){
            try{
                let arr = [];
                let data = await Inventory.find({pharmacyId: decoded.pharmacyId}).select({
                    _id:0
                });
                console.log(data);
                for (const d of data) {
                    const newData = await BatchInfo.findOne({medId:d.medId});
                    const batchNo = newData.batchNumber;
                    let temp = {}
                    temp["pharmacyName"] = d["pharmacyName"]
                    temp["pharmacyId"] = d["pharmacyId"]
                    temp["date"] = d["date"]
                    temp["medName"] = d["medName"]
                    temp["medQty"] = d["medQty"]
                    temp["unitPrice"] = d["unitPrice"]
                    temp["medId"] = d["medId"]
                    temp["medCount"] = d["medCount"]
                    temp["shelfNumber"] = d["shelfNumber"]
                    temp["batchNo"] = batchNo
                    arr.push(temp)
                }
                console.log(5);
                res.status(200).send(arr);
            }catch{
                console.log(err);
                res.status(500).send({
                    message:'Server Side Error!'
                });
            }

        }else{
            console.log(err);
            res.status(500).send({
                message:'Server Side Error!'
            });
        }
    });
});

// POS
router.post('/invoice', (req, res)=>{
    const token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_KEY, async(err, decoded)=>{     
        if(!err){ 
            try{
                const data = await Pharmacy.findOne({pharmacyId: decoded.pharmacyId});
                if(data){
                    const meds = data.medicines;
                    for (const m of meds) {
                        let invData = await Inventory.findOne({pharmacyId: decoded.pharmacyId, medId: m.medId});
                        if(invData && (invData.medQty - m.totalPurchased) >= 0){
                            let total = m.totalPurchased;
                            let x = invData.medQty - total;
                            await Inventory.updateOne({pharmacyId: decoded.pharmacyId, medId: m.medId}, {$set:{medQty:x}});
                        }else{
                            res.status(500).send({
                                message: 'Didnt match with inventory!'
                            });
                        }
                    }
                    req.body.pharmacy = data._id;
                    let date = new Date(Date.now());
                    req.body.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`;
                    const newS = new Sales(req.body);
                    await Sales.save();
                }else{
                    res.status(500).send({
                        message: 'Server side error!'
                    });
                }
                
                const newSales = await new Sales(req.body);
                const rslt = newSales.save();
                res.status(200).send(req.body);
            }catch(err){
                res.status(500).send({
                    message: 'Server side error!'
                });
            }
        }else{
            res.status(500).send({
                message: 'Server side error!'
            });
        }
    });
});

router.post('/medicine', (req, res)=>{
    const authToken = req.headers.authorization;
    jwt.verify(authToken, process.env.JWT_KEY, async(err, decoded)=>{
        if(!err){
            const data = await Prescription.findOne({prescriptionId: req.body.prescriptionId});
            res.status(200).send(data);
        }else{
            res.status(500).send({
                message: "Server Side Error!"
            });
        }
    });
});

router.get('/POS', (req, res)=>{
    const authToken = req.headers.authorization;
    jwt.verify(authToken, process.env.JWT_KEY, (err, decoded)=>{
        if(!err){
            res.status(200).send();
        }else{
            res.status(500).send({
                message:"Server Side Error!"
            });
        }
    })
});

router.post('/invoices', async(req, res)=>{
    authToken = req.headers.authorization;
    let obj = {};
    let medObj = {};
    let arr = [];
    let finalArr = [];
    let sum = 0;
    jwt.verify(authToken, process.env.JWT_KEY, async(err, decoded)=>{
        if(!err){
            try{
                const data = await Sales.find({pharmacyId: decoded.pharmacyId});
                for (const d of data) {
                    obj.dt = d.date;
                    for (const c of d.medicines) {
                        medObj.medName = c.name;
                        medObj.medQty = c.totalPurchased;
                        let x = await Medicine.findOne({medId: c.medId});
                        sum += (x.unitPrice * c.totalPurchased);
                        medObj.total = (x.unitPrice * c.totalPurchased);
                        arr.push(medObj);
                        medObj = {};
                    }
                    obj.medicines = arr;
                    obj.total = sum;
                    arr = [];
                    finalArr.push(obj);
                    obj = {};
                    sum = 0;
                }           
                res.send(finalArr);
            }catch(err){
                console.log(err);
                res.status(500).send({
                    message:"Server Side Error!"
                });
            }
        }else{
            res.status(500).send({
                message:"Server Side Error!"
            });
        }
    });
    
});

router.get('/dupBatch', async(req, res)=>{
    const div = ['Dhaka', 'Sylhet', 'Chittagong', 'Barisal', 'Rajshahi', 'Khulna'];
    const comId = ['PC1645732956622', 'PC1645732956630', 'PC1645732956982', 'PC1645732957198', 'PC1645732956814', 'PC1645732957000', 'PC1645732957198', 'PC1645732957054', 'PC1645732956926', 'PC1645732958902', 'PC1645732957799','PC1645732960103', 'PC1645732959183', 'PC1645732958023'];

    let bInf = {};
    let count = 1;
    let salt = parseInt(process.env.SALT);

    for (const c of comId) {
        const data = await Medicine.find({companyId: c});
        const comp = await Pharmaceutical.findOne({companyId : c});
        for (const d of data) {
            bInf.medId = d.medId;
            bInf.companyId = c;
            bInf.count = 1000;
            
            bInf.batchNumber = `BT${Date.now() + (count * (Math.floor((Math.random() * salt) + 1)) * (Math.floor((Math.random() * (salt * Math.floor((Math.random() * 5) + 1))) + 1)))}`;;
            bInf.zone = div[x = Math.floor(Math.random() * (div.length)) < 0 ? 0 : Math.floor(Math.random() * (div.length))];
            bInf.manf = comp._id;
            console.log(bInf);
            let newB = new BatchInfo(bInf);
            await newB.save();
            
            bInf = {};
        }
    }
    res.end();
});

router.get('/dupPromote', async(req, res)=>{
    const comId = ['PC1645732956622', 'PC1645732956630', 'PC1645732956982', 'PC1645732957198', 'PC1645732956814', 'PC1645732957000', 'PC1645732957198', 'PC1645732957054', 'PC1645732956926', 'PC1645732958902', 'PC1645732957799','PC1645732960103', 'PC1645732959183', 'PC1645732958023'];

    let bInf = {};

    for (const c of comId) {
        let newComp = await Medicine.distinct('medId');
        if(newComp.length < 2){
            newComp = newComp.slice(0, newComp.length);
        }else if(newComp.length <= 5){
            newComp = newComp.slice(0, newComp.length);
        }else{
            newComp = newComp.slice(0, 5);
        }
        
        let comp = await Pharmaceutical.findOne({companyId : c})
        for (const n of newComp) {
            bInf.medId = n;
            bInf.companyId = c;
            bInf.manf = comp._id;
            let prom = new Promote(bInf);
            prom.save();
            bInf = {};
        }
    }
    
    res.end();
});


router.get('/dup', async(req, res)=>{
    const data = await Pharmaceutical.distinct('companyId');
    for (const d of data) {
        let c = await Pharmaceutical.find({companyId:d});
        if(c.length > 1){
            console.log(c);
        }
    }
    res.end();
});

router.get('/dupInventory', async(req, res)=>{
    const phm = await Pharmacy.distinct('pharmacyId');
    const comId = ['PC1645732956622', 'PC1645732956630', 'PC1645732956982', 'PC1645732957198', 'PC1645732956814', 'PC1645732957000', 'PC1645732957198', 'PC1645732957054', 'PC1645732956926', 'PC1645732958902', 'PC1645732957799','PC1645732960103', 'PC1645732959183', 'PC1645732958023'];
    let inventoryData = {};
    const qty = 100;
    for (const p of phm) {
        let pdata = await Pharmacy.findOne({pharmacyId : p});
        inventoryData.pharmacyName = pdata.name;
        inventoryData.pharmacyId = p;
        inventoryData.pharmacy = pdata._id;
        let year = Math.floor((Math.random() * 3) + 2019);
        let month = Math.floor((Math.random() * 11) + 1);
        let day = Math.floor((Math.random() * 30) + 1);
        let hr = Math.floor((Math.random() * 23));
        let min = Math.floor((Math.random() * 60));
        let sec = Math.floor((Math.random() * 60));

        if(![1, 3, 5, 7, 8, 10, 12].includes(month) && day > 30){
            day = 30;
        }else if(month === 2 && day > 28){
            day = 28;
        }
        inventoryData.date = `${year}-${month}-${day} (${hr}:${min}:${sec})`;
        for (const c of comId) {
            let bData = await BatchInfo.find({companyId:c})
            for (const b of bData) {
                const x = b.count - qty;
                if(b.zone.toLowerCase().trim() === pdata.zone.toLowerCase().trim() && x >= 0){
                    let med = await Medicine.findOne({medId : b.medId});
                    if(med){
                        inventoryData.medId = b.medId;
                        inventoryData.medName = med.brandName;
                        inventoryData.unitPrice = med.unitPrice;
                        inventoryData.medCount = med.perPage;
                        inventoryData.medQty = qty;
                        inventoryData.shelfNumber = `${String.fromCharCode(Math.floor(Math.random() * 5) + 65)}${Math.floor(Math.random() * 5) + 1}`;
                        let newInv = new Inventory(inventoryData);
                        await newInv.save();
                        await BatchInfo.updateOne({batchNumber : b.batchNumber}, {$set:{count: x}});
                    }
                }
                
            }
        }
        inventoryData = {};
    }
    res.end();
});

router.get('/dupBatchInc', async(req, res)=>{
    const comId = ['PC1645732956622', 'PC1645732956630', 'PC1645732956982', 'PC1645732957198', 'PC1645732956814', 'PC1645732957000', 'PC1645732957198', 'PC1645732957054', 'PC1645732956926', 'PC1645732958902', 'PC1645732957799','PC1645732960103', 'PC1645732959183', 'PC1645732958023'];
    
    for (const c of comId) {
        await BatchInfo.updateMany({companyId : c}, {$set:{count : 2000}})
    }
    res.end();
});

router.get('/dupPrescription', async(req, res)=>{
    const doc = await Doctor.distinct('doctorId');
    const medNames = await Medicine.distinct('brandName');
    let obj = {};
    let investigation = ['Sample 1', 'Sample 2', 'Sample 3'];
    let exm = ['Sample 1', 'Sample 2', 'Sample 3'];
    let advice = ['Sample 1', 'Sample 2', 'Sample 3'];
    let diag = ['Sample 1', 'Sample 2', 'Sample 3'];
    let complaint = ['Sample 1', 'Sample 2', 'Sample 3'];
    let flw = ["1 Month", "1 Week", "2 Weeks", "2 Months", "6 Months", "3 Months"];
    let bp = ['120/80', '140/70', '100/70'];
    let gender = ['Male', 'Female', 'Other'];
    let bg = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
    let name = ['Fahim Shakil', 'Saiful Islam', 'Hasan Shahrier', 'Jobaida Gulshan Ara', 'Hossain Shanto', 'Abdur Rahim', 'Manjurul Islam'];
    let dosage = [{
        morning:1,
        noon:1,
        night:1,
        total_count: 3
    }, {
        morning:1,
        noon:0,
        night:1,
        total_count: 2
    },{
        morning:0,
        noon:0,
        night:1,
        total_count: 1
    },{
        morning:1,
        noon:0,
        night:0,
        total_count: 1
    },{
        morning:0,
        noon:0,
        night:0,
        total_count: 4
    },{
        morning:0,
        noon:0,
        night:0,
        total_count: 6
    }]
    let paid = [600, 500, 1000, 1500];
    let salt = parseInt(process.env.SALT);
    let count = 1;

    for(let j = 1; j <= 10; ++j){
        for (const d of doc) {
            let docData = await Doctor.findOne({doctorId : d});
            obj.doctor = docData._id;
            obj.department = docData.dept;
    
            let date = new Date(Date.now());
            obj.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`;
            obj.prescriptionId =  `PR${Date.now() + (count * (Math.floor((Math.random() * salt) + 1)) * (Math.floor((Math.random() * (salt * Math.floor((Math.random() * 5) + 1))) + 1)))}`;
            count++;
            obj.complaint = complaint.slice(0, Math.floor(Math.random() * complaint.length));
            obj.examinations = exm.slice(0, Math.floor(Math.random() * exm.length));
            obj.diagnosis = diag.slice(0, Math.floor(Math.random() * diag.length));
            obj.investigation = investigation.slice(0, Math.floor(Math.random() * investigation.length));
            obj.advice = advice.slice(0, Math.floor(Math.random() * advice.length));
            obj.follow_up = flw[Math.floor(Math.random() * (flw.length - 1))];
            obj.currency = 'BDT';
            obj.patient_name = name[Math.floor(Math.random() * (name.length - 1))];
            obj.paid = paid[Math.floor(Math.random() * (paid.length - 1))];
            obj.weight = Math.floor(Math.random() * 40) + 70;
            obj.pulse = Math.floor(Math.random() * 70) + 70;
            obj.bp = bp[Math.floor(Math.random() * (bp.length - 1))];
            obj.gender = gender[Math.floor(Math.random() * (gender.length - 1))];
            obj.age = Math.floor(Math.random()* 70) + 10;
            obj.blood_group = bg[Math.floor(Math.random() * (bg.length - 1))];
            obj.age_type = 'Y';
            totalMeds = Math.floor(Math.random()* 9) + 3;
            let med;
            let tempObj;
            let arr = [];
            for(let i = 1; i <= totalMeds; i++){
                med = await Medicine.findOne({brandName: medNames[Math.floor(Math.random() * (medNames.length - 1))]});
                tempObj = dosage[Math.floor(Math.random() * (dosage.length - 1))];
                tempObj.duration = Math.floor(Math.random()* 57) + 3;
                tempObj.id = med.medId;
                tempObj.name = med.brandName;
                arr.push(tempObj);
                tempObj = {};
            }
            obj.medicine = arr;
            let newPres = new Prescription(obj);
            await newPres.save();
            obj = {};
        }
        count = 1;
    }

    res.end()
});

router.get('/dupSales', async(req, res)=>{
    const pharm = await Pharmacy.distinct('pharmacyId');
    let qty = 0;
    let sum = 0;
    let obj = {};
    let arr = [];
    for(let g = 1; g <= 50; ++g){
        try{
            for (const p of pharm) {
                let invData = await Inventory.find({pharmacyId : p});
                if(invData.length > 0){
                    for (const inv of invData) {
                        let x;
                        qty = Math.floor(Math.random() * 20) + 5;
                        if((inv.medQty - qty) >= 0){
                            x = inv.medQty - qty;
                        }else{
                            qty = inv.medQty;
                            x = 0
                        }
                        obj.totalPurchased = qty;
                        sum += (qty * inv.unitPrice);
                        obj.medId = inv.medId;
                        obj.name = inv.medName;
                        if(x){
                            await Inventory.updateOne({pharmacyId:p, medId: inv.medId}, {$set:{medQty:x}});
                        }else{
                            await Inventory.deleteOne({pharmacyId:p, medId: inv.medId});
                        }
        
                        arr.push(obj);
                        obj = {};
                    }
                    let year = Math.floor((Math.random() * 3) + 2019);
                    let month = Math.floor((Math.random() * 11) + 1);
                    let day = Math.floor((Math.random() * 30) + 1);
                    let hr = Math.floor((Math.random() * 23));
                    let min = Math.floor((Math.random() * 60));
                    let sec = Math.floor((Math.random() * 60));

                    if(![1, 3, 5, 7, 8, 10, 12].includes(month) && day > 30){
                        day = 30;
                    }else if(month === 2 && day > 28){
                        day = 28;
                    }
                    obj.date = `${year}-${month}-${day} (${hr}:${min}:${sec})`;
                    obj.total = sum;
                    obj.pharmacyId = p;
                    obj.medicines = arr;
                    let sales = new Sales(obj);
                    await sales.save();
                    sum = 0;
                    arr = [];
                    obj = {};
                }
        
            }
        }catch(err){
            console.log(err);
        }
    }
    
    res.end();
});

router.get('/saleSummary/', async(req, res)=>{
    const authToken = req.headers.authorization;
    jwt.verify(authToken, process.env.JWT_KEY, async(err, decoded)=>{
        let obj = {};
        if(!err){
            const data = await Sales.find({pharmacyId: decoded.pharmacyId}).select({
                _id: 0,
                pharmacyId: 0,
                medicines:0
            });
        
            let years = [];
            
            for (const d of data) {
                let x = d.date.split(' ')[0].split('-')[0];
                if(!years.includes(x)){
                    years.push(x);
                }
            }
            for (const d of data) {
                let x = d.date.split(' ')[0].split('-')[0];
                let rslt = years.filter(el => el === x);
                if(!obj[rslt[0]]){
                    obj[rslt[0]] = d.total;
                }else{
                    let y = obj[rslt[0]];
                    y += d.total;
                    obj[rslt[0]] = y;
                }
            }

            res.send(obj);
        }else{
            res.status(500).send();
        }
    });
});

router.get('/topProducts', (req, res)=>{
    const authToken = req.headers.authorization;
    jwt.verify(authToken, process.env.JWT_KEY, (err, decoded)=>{
        if(!err){
            
        }else{
            res.status(500).send();
        }
    });
});

router.get('/salesdata/:id', async(req, res)=>{
    const data = await Sales.find({pharmacyId: req.params.id}).select({
        _id: 0,
        pharmacyId: 0,
        medicines:0
    });
    let arr = [];
    let obj = {};

    for (const d of data) {
        let x = d.date.split(' ');
        x = `${x[0]} ${x[1].slice(1, x[1].length-1)}`;
        obj.date = x;
        obj.total = d.total;
        arr.push(obj);
        obj = {};
    }

    const csv = new objtoCSV(arr);
    await csv.toDisk(`./CSV${Date.now()}.csv`);
    res.send();

});

router.get('/datasend', async(req, res)=>{
    let xhr = new XMLHttpRequest()
    xhr.responseType = "json"
    let url = "http://beginnersquest.com";
    xhr.onload = () => {
        if(xhr.status == 200 && xhr.readyState == 4){
            console.log(xhr.response);
        }
        else{
            console.log("Something Is Wrong");
        }
    }
    const newpres = await Prescription.find({});
    xhr.open("POST", url);
    xhr.send(JSON.stringify(newpres));
    res.end();
});

router.get('/dupDelete', async(req, res)=>{
    try{
        await Sales.deleteMany({total:0});
    }catch(err){
        console.log(err);
    }
    
    res.end();
});





module.exports = router;
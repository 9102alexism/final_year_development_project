
const docInfoChecker = (req, res, next)=>{

    console.log(typeof req.body.visitHour);
    console.log(typeof req.body.offDay);
    let x = req.body.visitHour;
    x = x.split(',');
    let y = req.body.offDay;
    y = y.split(',');
    req.body.visitHour = x;
    req.body.offDay = y;
    if((req.body.password.length >= 5) && req.body.regNumber && req.body.dept && req.body.degree && req.body.role && req.body.specializedFields && req.body.address && (req.body.visitHour.length > 0) && req.body.userId){
        next();
    }else{
        next("Authentication Failed!");
    }
}

const pharmacyInfoChecker = (req, res, next)=>{
    if((req.body.password.length >= 5) && req.body.zone && req.body.name && req.body.eTIN && req.body.operationHour && req.body.phone && req.body.address && req.body.userId ){
        next();
    }else{
        next("Authentication Failed!");
    }
};

const pharmaInfoChecker = (req, res, next) =>{
    if((req.body.password.length >= 5) &&  req.body.companyName && req.body.phone && req.body.userId  && req.body.address){
        next();
    }else{
        next("Authentication Failed!");
    }
};

module.exports = {docInfoChecker, pharmaInfoChecker, pharmacyInfoChecker};
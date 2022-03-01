const jwt = require('jsonwebtoken');
const Doctor = new mongoose.model("Doctor", doctorSchema);

const authChecker = (req, res, next)=>{
    const authToken = req.headers.authorization;
    jwt.verify(authToken, process.env.JWT_KEY, (err, decoded)=>{
        if(!err){
            req.id = await Doctor.findOne({userId: decoded.userId})._id;
            next();
        }else{
            next('Server Error!');
        }
    });
}

module.exports = authChecker
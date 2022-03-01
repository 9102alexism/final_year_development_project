const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


// routes
const adminEnd = require('./routeHandlers/adminServices');
const doctorEnd = require('./routeHandlers/docServices');
const pharmacyEnd = require('./routeHandlers/pharmacyServices');
const pharmceuticalEnd = require('./routeHandlers/pharmaceuticalServices');

mongoose
  .connect("mongodb://localhost/Test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" DB connection established ..."))
  .catch((err) => console.log(err));



app.use('/doctors', doctorEnd);
app.use('/admin', adminEnd);
app.use('/pharmacies', pharmacyEnd);
app.use('/pharmaceuticals', pharmceuticalEnd);


app.listen(3000, ()=>{
    console.log('::: Welcome FYDP II :::');
});
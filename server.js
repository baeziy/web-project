const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const path = require('path');
const connectDB = require('./config/db');
const port = process.env.PORT || 3000;

connectDB();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.send('All products');
});



app.listen(port, (req, res)=> console.log(`Listening at Port = ${port}`));
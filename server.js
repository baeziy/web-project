const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const path = require('path');
const connectDB = require('./config/db');
const engine = require('ejs-mate');
const port = process.env.PORT || 3000;
const Product = require('./models/productModel');

connectDB();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res)=>{
    res.render('boilerplate', {who: 'home'})
});

app.get('/products', async (req, res)=>{
     const products = await Product.find({});
     res.render('allproducts', {products});
});

app.get('/product/:id', async (req, res) =>{
    const product = await Product.findById(req.params.id);
    res.render('singleProduct', {product});

});

app.get('/new', async (res, req) =>{
})




app.listen(port, (req, res)=> console.log(`Listening at Port = ${port}`));
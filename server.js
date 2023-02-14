const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const path = require('path');
const connectDB = require('./config/db');
const engine = require('ejs-mate');
const port = process.env.PORT || 3000;
const Product = require('./models/productModel');
const methodOverride = require('method-override');
const morgan = require('morgan');
const asyncHandler = require('express-async-handler');
const ExpressError = require('./utils/ExpressError');
const Joi = require('joi');
const validateProduct = require('./middleware/validateProduct');

connectDB();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

//home page
app.get('/', (req, res)=>{
    res.redirect('/products');
});

//view all products page
app.get('/products', asyncHandler( async (req, res)=>{
     const products = await Product.find({});
     res.render('products/allproducts', {products: products, title: 'All Products'});
}));

// new product form page
app.get('/products/new', (req, res) =>{
    res.render('products/newProduct', {title: 'New Product'});
})

// saving the data got from form to database
app.post('/products', validateProduct , asyncHandler( async (req, res)=>{

   
    const product = await Product.create(req.body.product);
    res.redirect(`/products/${product.id}`);

}));

// view specific product
app.get('/products/:id', asyncHandler(async (req, res) =>{
    const product = await Product.findById(req.params.id);
    res.render('products/singleProduct', {product: product, title: product.title});

}));

// edit product page
app.get('/products/:id/edit', asyncHandler( async (req, res) =>{

    const product = await Product.findById(req.params.id);
    res.render('products/productEdit', {product: product, title: 'Edit Product'});
}));

// updating product to the database
app.put('/products/:id', validateProduct, asyncHandler(async (req, res) =>{
    const product = await Product.findByIdAndUpdate(req.params.id, {...req.body.product});
    res.redirect(`/products/${product.id}`);
}));

// deleting the product from the database
app.delete('/products/:id/del', asyncHandler(async (req, res)=>{
    await Product.findByIdAndDelete(req.params.id);
    res.redirect(`/products`);

}));

app.all('*', (req, res, next)=>{
    return next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next)=>{
    const { statusCode = 500} = err;
    if(!err.message) err.message = 'Oh, no! Something Went Wrong'
    res.status(statusCode).render('error', {message: err.message, title: 'Error'});
})

app.listen(port, (req, res)=> console.log(`Listening at Port = ${port}`));
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
    res.render('boilerplate', {who: 'home'})
});

//view all products page
app.get('/products', async (req, res)=>{
     const products = await Product.find({});
     res.render('products/allproducts', {products: products, title: 'All Products'});
});

// new product form page
app.get('/products/new', (req, res) =>{
    res.render('products/newProduct', {title: 'New Product'});
})

// saving the data got from form to database
app.post('/products', async (req, res)=>{
    const product = await Product.create(req.body.product);
    res.redirect(`/products/${product.id}`);

})

// view specific product
app.get('/products/:id', async (req, res) =>{
    const product = await Product.findById(req.params.id);
    res.render('products/singleProduct', {product: product, title: product.title});

});

// edit product page
app.get('/products/:id/edit', async (req, res) =>{

    const product = await Product.findById(req.params.id);
    res.render('products/productEdit', {product: product, title: 'Edit Product'});
});

app.put('/products/:id', async (req, res) =>{
    const product = await Product.findByIdAndUpdate(req.params.id, {...req.body.product});
    res.redirect(`/products/${product.id}`);
});

app.delete('/products/:id/del', async (req, res)=>{
    await Product.findByIdAndDelete(req.params.id);
    res.redirect(`/products`);

})


app.listen(port, (req, res)=> console.log(`Listening at Port = ${port}`));
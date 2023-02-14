const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please enter a title"]
    },
    productType: {
        type: String,
        enum: ['vehicle', 'parts'],
        required: [true, "Please select a product type"]
    },
    price: {
        type: Number,
        required: [true, "Please enter a price"]
    },
    image: {
        type: String,
        required: [true, "Please enter an image link"]
    },
    description: {
        type: String,
        required: [true, "Please enter a description"]
    }

},{
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
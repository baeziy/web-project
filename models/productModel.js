const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        enum: ['vehicle', 'parts'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }

},{
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
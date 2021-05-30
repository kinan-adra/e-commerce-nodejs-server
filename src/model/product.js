const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
        validate(value) {
            if (value<0 || !Number.isInteger(value)) {
                throw new Error('QTY must be posetive number or zero')
            }
        }
    },
    price_per_unit:{
        type: Number,
        required: true,
    }
},{
    timestamps: true
})

const Product = new mongoose.model('Product',productSchema)

module.exports = Product
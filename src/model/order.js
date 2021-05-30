const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    totalPrice:{
        type: Number,
        required: true,
        validate(value) {
            if (value<0) {
                throw new Error('price must be posetive number or zero')
            }
        }
    },
    paymentIntentId: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true,
    }
},{
    timestamps: true
})

const Order = new mongoose.model('Order',orderSchema)

module.exports = Order
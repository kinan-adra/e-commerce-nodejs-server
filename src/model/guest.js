const mongoose = require('mongoose')

const guestSchema = mongoose.Schema({
    paymentIntentId: {
        type: String,
        required: true
    },
    costumerId: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Guest = mongoose.model('Guest',guestSchema)

module.exports = Guest
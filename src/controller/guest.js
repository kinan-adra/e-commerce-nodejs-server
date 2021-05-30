const Guest = require('../model/guest')
const Order = require('../model/order')
const PaymentIntent = require('../stripe/paymentIntent')
const costomers = require('../stripe/costumers')

exports.createPaymentForGuest = async (req, res) => {
    const {cartItems, description,receipt_email,shipping} = req.body
    

    try {
        const costumer = await costomers.greateCostumer()
        const costumerId = costumer.id
        const paymentIntent = await PaymentIntent.createPaymentIntent(cartItems, description,receipt_email,shipping,costumerId)
        const guest = new Guest({
            paymentIntentId: paymentIntent.id,
            costumerId
        })
        await guest.save()
        const order = new Order({
            userId: guest._id,
            totalPrice: paymentIntent.amount,
            paymentIntentId: paymentIntent.id,
            paymentStatus: paymentIntent.status
        })
        await order.save()
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
         })

    } catch (error){
        console.log(error)
        res.status(400).json({Error: error})
    }
     
}
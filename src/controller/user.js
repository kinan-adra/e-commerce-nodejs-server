const Product = require('../model/product')
const Order = require('../model/order')
const User = require('../model/user')
const PaymentIntent = require('../stripe/paymentIntent')
const costomers = require('../stripe/costumers')

exports.signUp = async (req, res) =>{
    const {name,password,email} = req.body
    const user = new User({name,password,email})
    try{
        const token = await user.generateAuthToken()
        res.status(201).send({userId: user._id,token})
    } catch (e) {
        console.log(e)
        res.status(400).send('Error')
    }
}

exports.signIn = async (req, res) => {
    try {
        const user = await User.findByEmailAndPassword(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({userId: user._id, token})

    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

exports.greatePayment = async (req, res) => {
    const {cartItems, description,receipt_email,shipping} = req.body
    const {email} = req.user
    try {
        const costumer = await costomers.greateCostumer(email)
        console.log('costumer is :',costumer)
        const costumerId = costumer.id
        const paymentIntent = await PaymentIntent.createPaymentIntent(cartItems, description,receipt_email,shipping,costumerId)

        console.log('payment Intent  is :',paymentIntent)
        const order = new Order({
            userId: req.user._id,
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
        res.status(400).json({Error: error.message})
    }
}
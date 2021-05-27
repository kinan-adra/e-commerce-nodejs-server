const Product = require('../model/product')
const Order = require('../model/order')
const User = require('../model/user')

exports.signUp = async (req, res) =>{
    const {name,password,email} = req.body
    const user = new User({name,password,email})
    try{
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (e) {
        console.log(e)
        res.status(400).send('Error')
    }
}

exports.signIn = async (req, res) => {
    
}
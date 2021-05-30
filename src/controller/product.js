const Product = require('../model/product')
const Order = require('../model/order')
const User = require('../model/user')

exports.getAllProducts = async (req,res)=>{
    try {
        const products = await Product.find({})
        res.send(products)
    } catch (e) {
        res.status(400).send({Error:e})
    }
    
}

exports.getProductDetailsById = async (req, res) => {
    const productId = req.body.productId
    if (!productId){
       return res.status(400).send({Error:'provide product Id'})
    }
    try {
        const product = await Product.findById(productId)
        res.status(200).send(product)
    } catch (e) {
        res.status(400).send({Error:e})
    }
}


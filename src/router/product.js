const express = require('express')
const productController = require('../controller/product')

const router = new express.Router();

router.get('/allproducts',productController.getAllProducts)
router.get('/product',productController.getProductDetailsById)


module.exports=router
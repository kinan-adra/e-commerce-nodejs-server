const express = require('express')
const auth = require('../middlewares/auth')
const userController = require('../controller/user')

const router = new express.Router();

router.post('/signup',userController.signUp)
router.post('/signin',userController.signIn)
router.post('/payment',auth,userController.greatePayment)



module.exports=router
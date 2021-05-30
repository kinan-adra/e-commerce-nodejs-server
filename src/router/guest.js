const express = require('express')
const guestController = require('../controller/guest')

const router = new express.Router();

router.post('/guestpayment',guestController.createPaymentForGuest)


module.exports=router
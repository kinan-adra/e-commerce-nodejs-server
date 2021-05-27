const express = require('express')
const guestController = require('../controller/guest')

const router = new express.Router();

router.post('/payment',guestController.createPaymentForGuest)


module.exports=router
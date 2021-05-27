const express = require('express')
const bodyParser = require('body-parser')
const webhookController = require('../stripe/webhook')

const router = new express.Router();

router.post('/webhook',express.raw({type: 'application/json'}),webhookController.webhook)


module.exports=router


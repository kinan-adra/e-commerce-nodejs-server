const express = require('express')
const userController = require('../controller/user')

const router = new express.Router();

router.post('/signup',userController.signUp)


module.exports=router
const express = require('express')
require('./src/db/mongoose')
require('dotenv').config()
const path = require('path')
const cors = require('cors')
const User = require('./src/model/user')
const Product = require('./src/model/product')
const Order = require('./src/model/order')
const productsRouter = require('./src/router/product')
const userRouter = require('./src/router/user')
const guestRouter = require('./src/router/guest')
const webhookRouter = require('./src/router/webhook')

const app = express()

const publicDirectoryPath = path.join(__dirname,'./public')

app.use(express.static(publicDirectoryPath))
app.use(cors({ origin: true }));
app.use(express.json({
    verify: (req, res, buffer) => req['rawBody'] = buffer, 
  }))
app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
      next();
    } else {
      express.json()(req, res, next);
    }
  })
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(productsRouter)
app.use(userRouter)
app.use(guestRouter)
app.use(webhookRouter)

app.get('',(req, res)=> {
  res.render('index')
})


// const updateOrder =  Order.findOneAndUpdate(
//   {paymentIntentId: 'pi_1IvTJpBhbv5f3TBM09XIJeEh'},
//   {paymentStatus: 'succeeded'},()=>{
//     console.log('Order Updated')
//   })

const port = process.env.PORT||3000
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
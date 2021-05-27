const stripeAPI = require('./stripe');
const Order = require('../model/order')

const webHookHandlers = {
  'checkout.session.completed': (data) => {
    console.log('Checkout completed successfully', data);
  },

  'payment_intent.succeeded':  (data) => {
    console.log('Message from webhook: Payment succeeded')
    //update the order 
    const updateOrder =  Order.findOneAndUpdate(
      { paymentIntentId: data.id},
      { paymentStatus: data.status},
      ()=> {
        console.log('Order Updated')
      })
    
    //const updateOrder = Order.updateOne({ name: 'Jean-Luc Picard' }, { ship: 'USS Enterprise' })
  },
  'payment_intent.payment_failed': (data) => {
    console.log('Payment Failed', data)
  }
}

exports.webhook= (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripeAPI.webhooks.constructEvent(
      req['rawBody'], sig, 'whsec_fKbOYGGjF8v5X5RDHfSGUhsKgK1dGy1Y')
  } catch(error) {
    console.log(error.message)
    return res.status(400).send(`Webhook error ${error.message}`);
  }

  if (webHookHandlers[event.type]) {
    webHookHandlers[event.type](event.data.object);
  }
}
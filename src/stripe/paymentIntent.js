const stripeAPI = require('./stripe')


function calculateOrderAmount(cartItems) {
  var cartTotalPrice = cartItems.reduce((total, product) => {
    return total + product.price * product.quantity
  }, 0) 

  return Math.floor((cartTotalPrice * 100).toFixed(2))
}

exports.createPaymentIntent= async (cartItems, description,receipt_email,shipping,costomerId) => {
  let paymentIntent;
  try {
    paymentIntent = await stripeAPI.paymentIntents.create({
      amount: calculateOrderAmount(cartItems),
      currency: 'usd',
      description,
      payment_method_types: ['card'],
      customer:costomerId,
      receipt_email,
      shipping,
      metadata: {integration_check: 'accept_a_payment'}
    })
    return paymentIntent
  } catch (error) {
    console.log(error)
    return error
  }
}

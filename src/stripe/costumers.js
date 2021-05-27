const stripeAPI = require('./stripe')

exports.greateCostumer = async (address,description,email,payment_method) => {
    try {
        const costumer = await stripeAPI.customers.create({
            address,
            description,
            email,
            payment_method
          })
        return costumer
    }catch (error){
        console.log(error.message)
        
    }
    
    
}
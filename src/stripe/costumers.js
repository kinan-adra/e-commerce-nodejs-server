const stripeAPI = require('./stripe')

exports.greateCostumer = async (email) => {
    try {
        const costumer = await stripeAPI.customers.create({
            email
          })
        return costumer
    }catch (error){
        console.log(error.message)
        
    }
    
    
}
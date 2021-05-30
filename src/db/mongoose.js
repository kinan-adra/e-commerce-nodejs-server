const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/e-commerce-shop', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(()=> {
    console.log('Connected to DB')
})
.catch((e)=> {
    console.log('failed to connect with DB',e)
})
    

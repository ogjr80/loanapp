const express = require('express'); 
const Customer = require('./models/Customer'); 
const Loan = require('./models/Loan');
const morgan = require('morgan');
const bodyParser = require('body-parser'); 


const mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost:27017/testdb', function(){
    console.log('database connection successful'); 

})

const app = express(); 
app.use(morgan('dev')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false})); 




app.get('/customer', function(req, res){
    return Customer.find({}).then(result => {
        res.json(result); 
    }).catch(err => {
        throw err; 
    })
})


app.post('/customer', function(req, res){
    const customer = new Customer({
        name : req.body.name
    }); 

    return customer.save().then(result => {
        return console.log(customer); 
    });


})

app.get('/loan', function(req, res){
    return  Loan.find({}).then(loans => {
        res.json(loans)
    }).catch(err => {
        throw err; 
    })
})


app.post('/loan', function(req, res){
    const loan = new Loan({
        name: req.body.name, 
        customer: '5e9b0862551a284cf01bea88'
        //oming back to implement this after the customer is created. 

    });

    return loan.save().then(result => {
        return loan; 
    }); 

})
app.listen(3000, function(){
    console.log('server running on port 3000')
}); 


const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 


const CustomerSchema = new Schema({
    id: String, 
    name : String, 
    Loans: [{
        type : Schema.Types.ObjectId, 
        ref: 'Loan'
    }]


})
module.exports = mongoose.model('Customer', CustomerSchema); 

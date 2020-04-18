const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 


const loanSchema = new Schema({
    id: String, 
    name : String, 
    customer: {
        type: Schema.Types.ObjectId, 
        ref: 'Customer'
    }


})
module.exports = mongoose.model('Loan', loanSchema); 

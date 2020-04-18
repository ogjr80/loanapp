const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const { ObjectId} = from Schema.Types;

const loanSchema = new Schema({
  id: String,
  name: String,
  amount: Number,
  term: String,
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer"
  }
});
module.exports = mongoose.model("Loan", loanSchema);

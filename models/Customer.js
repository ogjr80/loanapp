const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const { ObjectId } = Schema.Types;

const CustomerSchema = new Schema({
  id: String,
  name: String,
  email: String,
  loans: [
    {
      type: Schema.Types.ObjectId,
      ref: "Loan"
    }
  ]
});
module.exports = mongoose.model("Customer", CustomerSchema);

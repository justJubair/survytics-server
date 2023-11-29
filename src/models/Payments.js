const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSchema = new Schema({
   name: String,
   email: String,
   transactionId: String,
   price: Number,
   role: String,


});

const Payments = mongoose.model("Payments", PaymentSchema);

module.exports = Payments;

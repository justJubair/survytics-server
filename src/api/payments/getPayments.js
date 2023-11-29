const Payments =require("../../models/Payments")
const getPayments = async (req, res) => {
  const result = await Payments.find();
  res.send(result);
 
};

module.exports = getPayments;

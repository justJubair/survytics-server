const Payments =require("../../models/Payments")
const Users =require("../../models/Users")
const postPayment = async (req, res) => {
    const payment = req?.body;
    const userEmail = payment.email;
    const updatedDoc = {
      $set: {
        role: payment?.role,
      },
    };
    const roleUpdatedResult = await Users.updateOne(
      { email: userEmail },
      updatedDoc
    );
    const paymentResult = await Payments.create(payment);
    res.send({ paymentResult, roleUpdatedResult });
  }

  module.exports=postPayment
const Users = require("../../models/Users")
const updateRole = async (req, res) => {
    const id = req.params.id;
    const role = req?.body;
    const filter = { _id: id };
    const updatedDoc = {
      $set: {
        role: role?.value,
      },
    };
    const result = await Users.updateOne(filter, updatedDoc);
    res.send(result);
  }

  module.exports=updateRole
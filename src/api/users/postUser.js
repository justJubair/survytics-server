const Users = require("../../models/Users")
const postUser = async (req, res) => {
  const user = req.body;
  const query = { email: user?.email };
  const isExist = await Users.findOne(query);
  if (isExist) {
    return res.send({ message: "user already exists" });
  }
  const result = await Users.create(user);
  res.send(result);
};

module.exports=postUser
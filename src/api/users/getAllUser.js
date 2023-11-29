const Users =require("../../models/Users")
const getAllUser = async (req, res) => {
    let query = {};
    if (req?.query?.userFilter) {
      query = { role: req?.query?.userFilter };
    }
    const result = await Users.find(query);
    res.send(result);
  };


module.exports=getAllUser